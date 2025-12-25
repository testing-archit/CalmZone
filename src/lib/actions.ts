"use server";

import { db } from "./db";
import { tasks, moodLogs, journalEntries, users } from "./schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { analyzeEntryWithAI } from "./ai";
import { createSession, getSession } from "./auth";
import { redirect } from "next/navigation";



export async function getTasks() {
    const userId = await getSession();
    if (!userId) return [];
    return await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt));
}

export async function addTask(formData: FormData) {
    const title = formData.get("title") as string;
    if (!title) return;

    const userId = await getSession();
    if (!userId) return;

    await db.insert(tasks).values({
        userId,
        title,
        isCompleted: false,
    });
    revalidatePath("/dashboard");
}

export async function toggleTask(id: number, isCompleted: boolean) {
    await db.update(tasks).set({ isCompleted }).where(eq(tasks.id, id));
    revalidatePath("/dashboard");
}

export async function getMoods() {
    const userId = await getSession();
    if (!userId) return [];
    return await db.select().from(moodLogs).where(eq(moodLogs.userId, userId)).orderBy(desc(moodLogs.createdAt)).limit(30);
}

export async function addMood(score: number, note: string) {
    const userId = await getSession();
    if (!userId) return;
    await db.insert(moodLogs).values({
        userId,
        moodScore: score,
        note,
    });
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

    if (!title || !content) return;

    const userId = await getSession();
    if (!userId) return;

    await db.insert(journalEntries).values({
        userId,
        title,
        content
    });
    revalidatePath("/journal");
}

export async function analyzeEntry(id: number, content: string) {
    const aiResult = await analyzeEntryWithAI(content);

    await db.update(journalEntries).set({
        sentiment: aiResult.sentiment,
        aiResponse: aiResult.advice
    }).where(eq(journalEntries.id, id));

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
