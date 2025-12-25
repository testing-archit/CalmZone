"use server";

import { db } from "./db";
import { tasks, moodLogs, journalEntries, users, chatMessages, aiInsights } from "./schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { analyzeEntryWithAI, chatWithAI, generateMoodInsights } from "./ai";
import { createSession, getSession } from "./auth";
import { redirect } from "next/navigation";



export async function getTasks() {
    const userId = await getSession();
    if (!userId) return [];
    return await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt));
}

export async function addTask(formData: FormData) {
    const title = formData.get("title") as string;
    if (!title) {
        console.error("❌ Task creation failed: No title provided");
        return;
    }

    const userId = await getSession();
    if (!userId) {
        console.error("❌ Task creation failed: No user session");
        return;
    }

    const result = await db.insert(tasks).values({
        userId,
        title,
        isCompleted: false,
    }).returning();

    console.log(`✅ Task saved to DB: ID=${result[0].id}, User=${userId}, Title="${title}", Time=${new Date().toISOString()}`);
    revalidatePath("/dashboard");
}

export async function toggleTask(id: number, isCompleted: boolean) {
    await db.update(tasks).set({
        isCompleted,
        completedAt: isCompleted ? new Date() : null
    }).where(eq(tasks.id, id));

    console.log(`Task ${id} toggled to ${isCompleted} at ${new Date().toISOString()}`);
    revalidatePath("/dashboard");
}

export async function getMoods() {
    const userId = await getSession();
    if (!userId) return [];
    return await db.select().from(moodLogs).where(eq(moodLogs.userId, userId)).orderBy(desc(moodLogs.createdAt)).limit(30);
}

export async function addMood(score: number, note: string) {
    const userId = await getSession();
    if (!userId) {
        console.error("❌ Mood log failed: No user session");
        return;
    }

    const result = await db.insert(moodLogs).values({
        userId,
        moodScore: score,
        note,
    }).returning();

    console.log(`✅ Mood logged to DB: ID=${result[0].id}, User=${userId}, Score=${score}, Time=${new Date().toISOString()}`);
    revalidatePath("/dashboard");
    revalidatePath("/mood");
}

export async function getJournalEntries() {
    const userId = await getSession();
    if (!userId) return [];
    return await db.select().from(journalEntries).where(eq(journalEntries.userId, userId)).orderBy(desc(journalEntries.createdAt));
}

export async function addJournalEntry(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
        console.error("Journal entry missing required fields");
        return;
    }

    const userId = await getSession();
    if (!userId) {
        console.error("No user session found for journal entry");
        return;
    }

    const result = await db.insert(journalEntries).values({
        userId,
        title,
        content
    }).returning();

    console.log(`Journal entry created: ID ${result[0].id} by User ${userId} at ${new Date().toISOString()}`);
    revalidatePath("/journal");
}

export async function analyzeEntry(id: number, content: string) {
    console.log(`Analyzing journal entry ${id} at ${new Date().toISOString()}`);
    const aiResult = await analyzeEntryWithAI(content);

    await db.update(journalEntries).set({
        sentiment: aiResult.sentiment,
        aiResponse: aiResult.advice,
        updatedAt: new Date()
    }).where(eq(journalEntries.id, id));

    console.log(`Entry ${id} analyzed: Sentiment=${aiResult.sentiment}`);
    revalidatePath("/journal");
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Please fill in all fields" };

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user.length || user[0].password !== password) {
        return { error: "Invalid credentials" };
    }

    await createSession(user[0].id);
    redirect("/dashboard");
}

export async function signup(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) return { error: "Please fill in all fields" };

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
        return { error: "User with this email already exists" };
    }

    const newUser = await db.insert(users).values({
        name,
        email,
        password
    }).returning();

    await createSession(newUser[0].id);
    redirect("/dashboard");
}

// Chat actions
export async function sendChatMessage(message: string) {
    const userId = await getSession();
    if (!userId) return "Please log in to chat.";

    // Save user message
    await db.insert(chatMessages).values({
        userId,
        role: "user",
        content: message
    });

    // Get recent history for context
    const history = await db.select()
        .from(chatMessages)
        .where(eq(chatMessages.userId, userId))
        .orderBy(desc(chatMessages.createdAt))
        .limit(10);

    const contextHistory = history.reverse().map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    // Get AI response
    const aiResponse = await chatWithAI(message, contextHistory);

    // Save AI response
    await db.insert(chatMessages).values({
        userId,
        role: "assistant",
        content: aiResponse
    });

    console.log(`Chat: User ${userId} - AI responded at ${new Date().toISOString()}`);
    return aiResponse;
}

export async function getChatHistory() {
    const userId = await getSession();
    if (!userId) return [];

    return await db.select()
        .from(chatMessages)
        .where(eq(chatMessages.userId, userId))
        .orderBy(chatMessages.createdAt)
        .limit(50);
}

// Mood insights action
export async function fetchMoodInsights() {
    const userId = await getSession();
    if (!userId) return null;

    // Check cache first
    const cached = await db.select()
        .from(aiInsights)
        .where(eq(aiInsights.userId, userId))
        .orderBy(desc(aiInsights.createdAt))
        .limit(1);

    // Return cache if less than 24 hours old
    if (cached.length > 0 && cached[0].createdAt) {
        const age = Date.now() - new Date(cached[0].createdAt).getTime();
        if (age < 24 * 60 * 60 * 1000) {
            return JSON.parse(cached[0].content);
        }
    }

    // Generate fresh insights
    const moods = await getMoods();
    if (moods.length < 7) return null; // Need at least a week of data

    const insights = await generateMoodInsights(moods);

    // Cache insights
    await db.insert(aiInsights).values({
        userId,
        insightType: "mood_pattern",
        content: JSON.stringify(insights),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

    console.log(`Generated mood insights for User ${userId}`);
    return insights;
}
