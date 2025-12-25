import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const moodLogs = pgTable('mood_logs', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
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
    completedAt: timestamp('completed_at'),
});

export const journalEntries = pgTable('journal_entries', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    title: text('title').notNull(),
    content: text('content').notNull(),
    sentiment: text('sentiment'),
    aiResponse: text('ai_response'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const chatMessages = pgTable('chat_messages', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    role: text('role').notNull(), // 'user' or 'assistant'
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const aiInsights = pgTable('ai_insights', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    insightType: text('insight_type').notNull(), // 'mood_pattern', 'recommendation', etc.
    content: text('content').notNull(), // JSON stringified
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at'), // Cache expiration
});
