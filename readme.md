# CalmZone - Mental Wellness Platform

CalmZone is a modern, premium web application designed to help users track their mental well-being. It features a mood tracker, personal journal with AI insights, task management, and curated mental health resources.

This project has been completely revamped from a static HTML site to a full-stack Next.js application.

## 🚀 Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Database:** PostgreSQL (via [Neon](https://neon.tech/))
-   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animations:** specific Tailwind utilities & custom CSS.

## ✨ Features

-   **Authentication:** Secure Sign In and Sign Up with session management.
-   **Dashboard:** Real-time overview of daily tasks and mood history.
-   **Mood Tracker:** Interactive 1-5 scale to log daily emotions with notes.
-   **AI Journal:** Write entries and get instant (simulated) AI therapeutic advice and sentiment analysis.
-   **Task Manager:** Simple todo list to track wellness goals.
-   **Resources & Community:** Curated hubs for support and connection.
-   **Data Seeding:** Built-in tool to populate the account with 90 days of realistic demo data.

## 🛠️ Getting Started

### Prerequisites

-   Node.js 18+
-   A Neon PostgreSQL database connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/calmzone.git
    cd calmzone
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
    ```

4.  **Run Migrations:**
    Push the database schema to your Neon instance:
    ```bash
    npx drizzle-kit push
    ```

5.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Demo Data

To quickly see the app in action:
1.  **Sign Up** for a new account.
2.  Go to **Settings**.
3.  Click **Populate Demo Data**.
    *This will generate 90 days of mood logs, tasks, and journal entries.*

Alternatively, run the standalone seed script (creates a `demo@calmzone.ai` user):
```bash
npx tsx scripts/check-db.ts
```

## 📂 Project Structure

```
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utilities, DB config, Actions
│   └── middleware.ts # Route protection
├── drizzle/          # Database migrations
├── scripts/          # Standalone utility scripts
└── public/           # Static assets
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/testing-archit/project-showcase-2)

**Quick Deploy Steps:**
1. Click the deploy button above
2. Add environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `GEMINI_API_KEY`: Your Google Gemini API key
3. Deploy!

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📄 License

MIT License - feel free to use this project as you wish!
