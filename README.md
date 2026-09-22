# PRAXIS

![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black)
![React](https://img.shields.io/badge/React-19.2.8-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ecf8e)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Author](https://img.shields.io/badge/Author-najmahares-purple)

A stock market learning platform for the Nairobi Securities Exchange. Users read lessons, build a virtual portfolio with real NSE prices, work through decision scenarios, and get feedback from an AI mentor named Jema. No real money is ever involved.

---

## What the platform does

| Route              | What happens there                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/dashboard`       | Landing page after sign in. Shows portfolio summary, weekly activity, progress, recent events, and next recommended action. New users see a welcome card with three CTAs.     |
| `/learning`        | The Foundations curriculum. Lessons are grouped by level. Each lesson has paragraphs, examples, diagrams, and a quiz. Completing a lesson marks it done and unlocks the next. |
| `/portfolio`       | The virtual portfolio. Shows cash, holdings, allocation, and performance. Users buy and sell real NSE listed companies at live prices.                                        |
| `/portfolio/setup` | First time setup. The user chooses their starting virtual capital.                                                                                                            |
| `/portfolio/trade` | Trade screen. Buy or sell a ticker, enter quantity, review cost, confirm.                                                                                                     |
| `/practice`        | Decision cards grouped by topic. Each card presents a real scenario. The user picks an option, then sees feedback.                                                            |
| `/market/[ticker]` | Company page. Live price, chart, key stats, and an AI generated summary of the business.                                                                                      |
| `/mentor`          | Chat with Jema, the AI mentor. Jema answers questions, gives feedback on decisions, and adapts to what the user has completed.                                                |
| `/community`       | Feed of posts from other learners. Users read, react, and reply.                                                                                                              |
| `/progress`        | Aggregate view. Lessons completed, practice cards completed, portfolio decisions made.                                                                                        |
| `/bookmarks`       | Saved lessons, cards, and community posts.                                                                                                                                    |
| `/notifications`   | In app notifications.                                                                                                                                                         |
| `/settings`        | Profile, appearance, notification preferences, practice preferences, security.                                                                                                |
| `/onboarding`      | First run flow after signup.                                                                                                                                                  |
| `/admin`           | Admin dashboard for user and event management. Restricted to emails listed in `PRAXIS_ADMIN_EMAILS`.                                                                          |

---

## Tech stack

| Layer             | Package                                  | Version         |
| ----------------- | ---------------------------------------- | --------------- |
| Framework         | next                                     | 16.3.5          |
| UI                | react, react-dom                         | 19.2.8          |
| Language          | typescript                               | 5               |
| Styling           | tailwindcss, @tailwindcss/postcss        | 4               |
| Auth and database | @supabase/supabase-js                    | 2.116.0         |
| Rate limiting     | @upstash/ratelimit, @upstash/redis       | 2.1.0, 1.38.4   |
| Diagrams          | mermaid                                  | 12.0.0          |
| LLM               | Groq and Google Gemini via server routes | n/a             |
| Tests             | @playwright/test                         | via npx         |
| Edge deploy       | @opennextjs/cloudflare, wrangler         | 1.20.6, 4.134.0 |

---

## Local setup

### Requirements

- Node.js 20 or later
- A Supabase project
- An Upstash Redis database
- A Groq API key
- A Gemini API key

### Steps

Clone the repository.

```bash
git clone https://github.com/najmahares/praxis.git
cd praxis/frontend
```

Install dependencies.

```bash
npm install
```

Create the environment file.

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in every value. See the next section for what each one is.

Apply the SQL files in `frontend/supabase/` to your Supabase project, in order. They create the tables for users, portfolios, lessons, community posts, and notifications.

Start the development server.

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Environment variables

| Name                       | Used by           | Notes                                |
| -------------------------- | ----------------- | ------------------------------------ |
| `SUPABASE_URL`             | Server and client | Your Supabase project URL            |
| `SUPABASE_ANON_KEY`        | Server and client | Safe for the browser                 |
| `SUPABASE_SERVICE_KEY`     | Server only       | Never expose to the browser          |
| `UPSTASH_REDIS_REST_URL`   | Server only       | Rate limiter endpoint                |
| `UPSTASH_REDIS_REST_TOKEN` | Server only       | Rate limiter token                   |
| `GROQ_API_KEY`             | Server only       | Primary LLM provider                 |
| `GEMINI_API_KEY`           | Server only       | Fallback LLM provider                |
| `PRAXIS_ADMIN_EMAILS`      | Server only       | Comma separated list of admin emails |

---

## Scripts

| Command                   | What it runs                                |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Next.js dev server with Turbopack           |
| `npm run build`           | Production build                            |
| `npm run start`           | Production server                           |
| `npm run lint`            | ESLint                                      |
| `npm run seed`            | Seed demo data                              |
| `npm run test:e2e`        | Playwright end to end tests                 |
| `npm run test:e2e:ui`     | Playwright UI mode                          |
| `npm run test:e2e:report` | Show the last test report                   |
| `npm run deploy`          | Build and deploy to Cloudflare via OpenNext |

---

## Project structure

```
praxis/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (admin)/admin/          Admin pages
│   │   │   ├── (app)/                  Authenticated shell
│   │   │   │   ├── bookmarks/
│   │   │   │   ├── community/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── learning/
│   │   │   │   ├── market/
│   │   │   │   ├── mentor/
│   │   │   │   ├── notifications/
│   │   │   │   ├── portfolio/
│   │   │   │   ├── practice/
│   │   │   │   ├── progress/
│   │   │   │   └── settings/
│   │   │   ├── api/                    Server routes
│   │   │   ├── auth/                   Auth callback
│   │   │   ├── forgot/                 Password reset request
│   │   │   ├── login/
│   │   │   ├── onboarding/
│   │   │   ├── register/
│   │   │   └── reset-password/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── community/
│   │   │   ├── dashboard/
│   │   │   ├── errors/
│   │   │   ├── jema/                   Mentor UI
│   │   │   ├── landing/
│   │   │   ├── layout/
│   │   │   ├── legal/
│   │   │   ├── settings/
│   │   │   └── ui/
│   │   └── lib/
│   │       ├── admin/
│   │       ├── auth/                   Session, claims, storage scoping
│   │       ├── bookmarks/
│   │       ├── community/
│   │       ├── curriculum/             Lesson content
│   │       ├── dashboard/
│   │       ├── email/
│   │       ├── events/
│   │       ├── lesson-progress/
│   │       ├── market/                 NSE data adapter
│   │       ├── mentor/                 Jema prompts and LLM calls
│   │       ├── notifications/
│   │       ├── practice/               Card scenarios
│   │       ├── progress/
│   │       ├── rate-limit.ts
│   │       ├── settings/
│   │       └── userStorage.ts
│   ├── supabase/                       SQL migrations
│   ├── scripts/                        Seed and cleanup scripts
│   └── tests/                          Playwright tests
└── README.md
```

---

## Deploy to Vercel

1. Push the repository to GitHub.
2. Go to `https://vercel.com/new` and import the repository.
3. Set the Root Directory to `frontend`.
4. Framework preset is detected as Next.js automatically.
5. Add all eight environment variables from the table above. Do not add any local only flags such as `PRAXIS_DISABLE_AUTH_RATELIMIT`.
6. Click Deploy.
7. After the first deploy finishes, open Supabase, go to Authentication, then URL Configuration, and set the Site URL to your Vercel domain. Add these redirect URLs.

   ```
   https://your-app.vercel.app/**
   https://your-app.vercel.app/api/auth/callback
   ```

8. Redeploy once so the auth settings take effect.

---

## Testing

```bash
npm run test:e2e
```

Tests cover authentication, dashboard, market pages, practice cards, settings, portfolio, learning, progress, bookmarks, community, and notifications.

---

## Design principles

1. Every term is defined the first time it appears.
2. Examples use Kenyan companies, KSh amounts, and local tax rules.
3. The product teaches reasoning about decisions, not fast trading.
4. No certainty is promised. Markets are uncertain.
5. All activity is simulated.

---

## Disclaimers

PRAXIS is not a brokerage. No real money moves through the platform. All trades, prices, portfolios, and returns are simulated.

PRAXIS is not financial advice. Nothing in the lessons, scenarios, or Jema responses is a recommendation to buy, sell, or hold any security. Consult a licensed advisor before making real investment decisions.

Market data is provided for educational context only. It may be delayed, incomplete, or inaccurate. Do not rely on it for real trading.

---

## License

MIT. See `LICENSE`.

---

## Author

Najma Hares. Nairobi.
