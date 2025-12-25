
import * as dotenv from "dotenv";
import { sql } from "drizzle-orm";

dotenv.config({ path: ".env.local" });

async function checkAndSeed() {
    // Dynamic import to ensure env vars are loaded
    const { db } = await import("../src/lib/db");
    const { users, moodLogs, tasks, journalEntries } = await import("../src/lib/schema");

    console.log("Checking Database...");

    const userCount = await db.select({ count: sql`count(*)` }).from(users);
    console.log("Users:", userCount[0].count);

    const moodCount = await db.select({ count: sql`count(*)` }).from(moodLogs);
    console.log("Mood Logs:", moodCount[0].count);

    if (Number(userCount[0].count) <= 0) {
        console.log("No users found. Creating Demo User...");
        const newUser = await db.insert(users).values({
            name: "Demo User",
            email: "demo@calmzone.ai",
            password: "password123"
        }).returning();
        console.log("Created User:", newUser[0]);

        const userId = newUser[0].id;

        // Seed Moods
        const moods = [];
        for (let i = 0; i < 30; i++) {
            moods.push({
                userId,
                moodScore: Math.floor(Math.random() * 5) + 1,
                note: "Seeded mood",
                createdAt: new Date(),
            });
        }
        await db.insert(moodLogs).values(moods);
        console.log("Seeded 30 mood logs.");

        // Seed Tasks
        await db.insert(tasks).values([
            { userId, title: "Morning Meditation (10m)", isCompleted: true },
            { userId, title: "Drink 2L Water", isCompleted: true },
            { userId, title: "Read 10 pages", isCompleted: false },
        ]);
        console.log("Seeded tasks.");

    } else {
        console.log("Users exist. Counts:", { users: userCount[0].count, moods: moodCount[0].count });
    }
}

checkAndSeed().catch(console.error).finally(() => process.exit(0));
