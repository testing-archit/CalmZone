import { cookies } from "next/headers";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";

export async function createSession(userId: number) {
    const cookieStore = await cookies();
    cookieStore.set("calmzone_session", userId.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get("calmzone_session")?.value;
    return userIdStr ? parseInt(userIdStr) : null;
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("calmzone_session");
}

export async function getCurrentUser() {
    const userId = await getSession();
    if (!userId) return null;

    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return user[0] || null;
}
