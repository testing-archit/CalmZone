import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const moodLogs = pgTable('mood_logs', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'), // Simplified for demo, ideally foreign key to users
    moodScore: integer('mood_score').notNull(),
    note: text('note'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    title: text('title').notNull(),
    isCompleted: boolean('is_completed').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

export const journalEntries = pgTable('journal_entries', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    title: text('title').notNull(),
    content: text('content').notNull(),
    sentiment: text('sentiment'),
    aiResponse: text('ai_response'),
    createdAt: timestamp('created_at').defaultNow(),
});
