"use server";

import { db } from "./db";
import { moodLogs, tasks, journalEntries, users } from "./schema";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";

export async function seedData() {
    const userId = await getSession();
    if (!userId) return;

    // 1. Seed Moods (Past 90 days)
    const moods = [];
    const start = new Date();
    start.setDate(start.getDate() - 90);

    for (let i = 0; i < 90; i++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i);

        // Simulate realistic mood wave (sine wave + noise)
        const wave = Math.sin(i / 10) * 1.5 + 3.5;
        let score = Math.round(wave + (Math.random() - 0.5));
        score = Math.max(1, Math.min(5, score));

        moods.push({
            userId,
            moodScore: score,
            note: i % 7 === 0 ? "Weekly reflection: doing okay" : i % 10 === 0 ? "Great progress today" : "",
            createdAt: date,
        });
    }
    await db.insert(moodLogs).values(moods);

    // 2. Seed Tasks (50+ tasks)
    const taskList = [];
    const taskTitles = ["Morning Yoga", "Read 30 mins", "Drink Water", "Call Mom", "Deep Work", "Walk Content", "Journaling", "Meditation", "Planning", "Sleep by 10pm"];

    for (let i = 0; i < 50; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        taskList.push({
            userId,
            title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
            isCompleted: Math.random() > 0.3,
            createdAt: date
        });
    }
    await db.insert(tasks).values(taskList);

    // 3. Seed Journal Entries (20+ entries)
    const journalList = [];
    for (let i = 0; i < 20; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 60));

        journalList.push({
            userId,
            title: `Journal Entry - ${date.toLocaleDateString()}`,
            content: "Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
            sentiment: Math.random() > 0.5 ? "Positive" : "Neutral",
            aiResponse: "This is a simulated AI response. It seems like you are having a thoughtful day. Remember to prioritize your well-being.",
            createdAt: date,
        });
    }
    await db.insert(journalEntries).values(journalList);

    revalidatePath("/dashboard");
    revalidatePath("/journal");
    revalidatePath("/mood");
}
