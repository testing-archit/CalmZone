<div align="center">

![CalmZone Logo](./public/assets/logo.jpeg)

# 🧘 CalmZone

**AI-Powered Mental Wellness Platform**

> A modern, full-stack mental health companion built with Next.js 15, PostgreSQL, and Google Gemini AI

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini_1.5-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/testing-archit/CalmZone)

</div>

---

---

## ✨ Features

### 🤖 AI-Powered Features
- **CalmBot Companion** - 24/7 conversational AI support with crisis detection
- **Journal Analysis** - Sentiment analysis and therapeutic advice on entries
- **Mood Insights** - Pattern recognition and personalized recommendations from 30-day trends
- **Smart Caching** - AI insights cached for 24 hours for optimal performance

### 📊 Core Wellness Tools
- **Mood Tracker** - Interactive 1-5 scale with notes and trend visualization
- **Personal Journal** - Rich text entries with AI-powered analysis
- **Task Manager** - Daily wellness task tracking with completion timestamps
- **Resources Hub** - Curated mental health resources and crisis support information

### 🔐 Security & Data
- **Secure Authentication** - Email/password with session management
- **Database Persistence** - Every action saved to PostgreSQL with full audit trails
- **Route Protection** - Middleware-based authentication guards
- **Privacy First** - User-isolated data with comprehensive logging

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS v4 |
| **Backend** | Server Actions, Middleware |
| **Database** | PostgreSQL (Neon), Drizzle ORM |
| **AI** | Google Gemini 1.5 Flash |
| **Styling** | Tailwind CSS, Framer Motion, Glassmorphism |
| **Icons** | Lucide React |
| **Deployment** | Vercel-ready with optimized build |

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database (recommend [Neon](https://neon.tech))
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/testing-archit/CalmZone.git
cd CalmZone

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials:
# - DATABASE_URL (Neon PostgreSQL connection string)
# - GEMINI_API_KEY (Google Gemini API key)

# 4. Push database schema
npx drizzle-kit push

# 5. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🗄️ Database Schema

```sql
users (id, name, email, password, created_at, updated_at)
mood_logs (id, user_id, mood_score, note, created_at)
tasks (id, user_id, title, is_completed, created_at, completed_at)
journal_entries (id, user_id, title, content, sentiment, ai_response, created_at, updated_at)
chat_messages (id, user_id, role, content, created_at)
ai_insights (id, user_id, insight_type, content, created_at, expires_at)
```

See [DATABASE_PERSISTENCE.md](./DATABASE_PERSISTENCE.md) for audit logging details.

---

## 🧪 Demo Data

Populate your account with 90 days of realistic history:

**Option 1**: Via UI
1. Sign up at `/signup`
2. Navigate to Settings
3. Click "Populate Demo Data"

**Option 2**: Demo Account
- Email: `demo@calmzone.ai`
- Password: `password123`

---

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/testing-archit/CalmZone)

**Environment Variables Required:**
- `DATABASE_URL` - Neon PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📂 Project Structure

```
calmzone/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── chat/              # AI Chatbot interface
│   │   ├── dashboard/         # Main dashboard with widgets
│   │   ├── journal/           # Journal with AI analysis
│   │   ├── mood/              # Mood tracker
│   │   ├── login/signup/      # Authentication
│   │   └── settings/          # User settings
│   ├── components/            # Reusable UI components
│   │   └── Navbar.tsx        # Navigation with auth awareness
│   ├── lib/                   # Core utilities
│   │   ├── actions.ts        # Server actions (DB operations)
│   │   ├── ai.ts             # Gemini AI integration
│   │   ├── auth.ts           # Session management
│   │   ├── db.ts             # Database connection
│   │   └── schema.ts         # Drizzle schema definitions
│   └── middleware.ts          # Route protection
├── scripts/                   # Utility scripts
│   └── check-db.ts           # Database verification
├── drizzle/                   # Database migrations
└── public/                    # Static assets
```

---

## 🎯 Key Features Explained

### AI Chatbot (CalmBot)
- Conversational support powered by Gemini 1.5 Flash
- Context-aware responses based on conversation history
- Crisis keyword detection with emergency resource routing
- All messages persisted to database

### Journal with AI Analysis
- Write entries with rich text support
- Click "Analyze with AI" for instant sentiment analysis
- Receive personalized therapeutic advice
- All analysis results saved for review

### Mood Insights Widget
- Analyzes 30-day mood patterns using AI
- Provides trend observations and actionable suggestions
- Smart caching (refreshes every 24 hours)
- Requires minimum 7 days of mood data

### Database Persistence
- Every user action logged with timestamps
- Console output with ✅/❌ emojis for debugging
- `.returning()` on all inserts for verification
- Full audit trail for compliance

---

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npx drizzle-kit push        # Push schema changes
npx drizzle-kit studio      # Visual database browser

# Seed demo data
npx tsx scripts/check-db.ts
```

---

## 📊 Monitoring & Debugging

### Server Logs
Every database operation prints to console:
```
✅ Task saved to DB: ID=1, User=1, Title="Morning Meditation", Time=2025-12-25T06:00:00Z
✅ Mood logged to DB: ID=5, User=1, Score=4, Time=2025-12-25T06:30:00Z
✅ Journal entry created: ID=2, User=1, Time=2025-12-25T07:00:00Z
```

### Database Browser
```bash
npx drizzle-kit studio
# Opens web UI at http://localhost:4983
```

---

## 🤝 Contributing

Contributions welcome! Key areas for improvement:
- Additional AI features (recommendations engine, breathing coach)
- Enhanced data visualizations
- Mobile app companion
- Real-time collaboration features

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing framework
- **Vercel** - Hosting platform
- **Neon** - Serverless PostgreSQL
- **Google** - Gemini AI API
- **Drizzle** - Type-safe ORM

---

## 📞 Support

- **Crisis Support (India)**: 8448-8448-45
- **Documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md) and [DATABASE_PERSISTENCE.md](./DATABASE_PERSISTENCE.md)
- **Issues**: [GitHub Issues](https://github.com/testing-archit/CalmZone/issues)

---

**Built with ❤️ for mental wellness**
