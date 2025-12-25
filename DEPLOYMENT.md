# CalmZone - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. A [Vercel account](https://vercel.com/signup)
2. A [Neon PostgreSQL database](https://neon.tech)
3. A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Step 1: Prepare Your Database

1. **Create Neon Database** (if not done):
   - Go to [Neon Console](https://console.neon.tech)
   - Create a new project
   - Copy your connection string

2. **Push Database Schema**:
   ```bash
   # Set your DATABASE_URL locally first
   echo 'DATABASE_URL="your_connection_string"' > .env.local
   
   # Push schema to Neon
   npx drizzle-kit push
   ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**:
   In the Vercel project settings, add:
   ```
   DATABASE_URL=postgresql://...your_neon_string...
   GEMINI_API_KEY=AIzaSy...your_key...
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait ~2 minutes for build
   - Your app is live! 🎉

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add GEMINI_API_KEY

# Production deployment
vercel --prod
```

### Step 3: Seed Demo Data (Optional)

After deployment, you can seed data:

1. **Via UI**:
   - Sign up at `https://your-app.vercel.app/signup`
   - Go to Settings → Click "Populate Demo Data"

2. **Via Script**:
   ```bash
   # Run locally pointing to production DB
   DATABASE_URL="your_production_url" npx tsx scripts/check-db.ts
   ```

## ⚙️ Production Checklist

- [x] Environment variables configured in Vercel
- [x] Database schema pushed to Neon
- [x] Build succeeds (verify with `npm run build`)
- [x] All routes protected by middleware
- [x] HTTPS enforced (automatic on Vercel)
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)

## 🔧 Troubleshooting

### Build Fails on Vercel

**Check build logs** in Vercel dashboard. Common issues:

1. **Missing environment variables**:
   ```
   Error: No database connection string
   ```
   → Add `DATABASE_URL` in Vercel project settings

2. **TypeScript errors**:
   ```bash
   npm run build
   ```
   → Fix locally first, then redeploy

### Database Connection Issues

Ensure your Neon database allows connections from Vercel:
- Neon automatically allows all IPs by default
- Verify connection string includes `?sslmode=require`

### Middleware Deprecation Warning

The warning about `middleware.ts` → `proxy` is safe to ignore in Next.js 16.

## 📊 Monitoring

**Vercel Dashboard** provides:
- Real-time logs
- Performance analytics
- Error tracking

**Database Monitoring**:
- [Neon Console](https://console.neon.tech) for query stats
- Check server logs for ✅/❌ database operation markers

## 🔄 Continuous Deployment

Once connected to GitHub, every push to `main` triggers:
1. Automatic build on Vercel
2. Preview deployment
3. Production promotion (if build succeeds)

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string |
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for AI features |

## 🎯 Post-Deployment

Visit your app at `https://your-project.vercel.app` and:
1. Create an account
2. Populate demo data from Settings
3. Explore AI features (Chat, Journal Analysis, Mood Insights)

---

**Need help?** Check [Vercel Docs](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
