# Book a Call

A polished multi-step booking experience built with Next.js 15. Leads pick an available time from your Google Calendar, fill out an intake form, and receive a Google Meet invite — while you get their answers delivered to your inbox.

Live at: `yoursite.com/book-a-call`

---

## Features

- Real-time availability pulled from your Google Calendar (no double bookings)
- Multi-step UI: date/time picker → intake form → confirmation
- Google Calendar event created on both calendars with a Google Meet link
- Email with all form answers sent to you via Resend
- Deployed to Webflow Cloud at `/book-a-call`

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd book-a-call
npm install
```

### 2. Copy environment file

```bash
cp .env.example .env.local
```

---

### 3. Google Calendar Setup

#### Step 1 — Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project** → **New Project** → name it `book-a-call`
3. Click **Create**

#### Step 2 — Enable the Calendar API

1. In the left sidebar, go to **APIs & Services → Library**
2. Search for **Google Calendar API** and click **Enable**

#### Step 3 — Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Name: `book-a-call`
5. Under **Authorized redirect URIs**, add: `http://localhost:3000`
6. Click **Create**
7. Copy the **Client ID** and **Client Secret** into `.env.local`

#### Step 4 — Get your Refresh Token (one-time)

```bash
npm run auth
```

This opens a browser, you sign in and grant calendar access, then paste the code back into the terminal. Copy the printed `GOOGLE_REFRESH_TOKEN` into `.env.local`.

#### Step 5 — Add your Calendar ID

Your Calendar ID is your Gmail address. Add it to `.env.local`:

```
GOOGLE_CALENDAR_ID=you@gmail.com
```

---

### 4. Resend Setup (email)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key in the dashboard
3. Add it to `.env.local`:

```
RESEND_API_KEY=re_...
YOUR_EMAIL=you@yourdomain.com
```

> During development, Resend's sandbox allows sending to your own verified email. For production, verify your domain in the Resend dashboard and update the `from` address in `src/lib/email.ts`.

---

### 5. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000/book-a-call](http://localhost:3000/book-a-call)

---

### 6. Deploy to Webflow Cloud

#### Install the Webflow CLI (one-time, global)

```bash
npm install -g @webflow/webflow-cli
```

#### Authenticate

```bash
webflow auth login
```

This opens your browser to authenticate with your Webflow account.

#### First deploy

```bash
webflow cloud deploy -m /book-a-call -p "book-a-call" --auto-publish
```

This creates the project on Webflow Cloud, mounts it at `/book-a-call`, and publishes it. The `webflow.json` in the project root will be updated with your `projectId` automatically.

#### Subsequent deploys

```bash
npm run deploy
```

Your booking page will be live at `yoursite.com/book-a-call`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | OAuth 2.0 client ID from Google Cloud |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 client secret |
| `GOOGLE_REFRESH_TOKEN` | Long-lived token (run `npm run auth`) |
| `GOOGLE_CALENDAR_ID` | Your Gmail address |
| `RESEND_API_KEY` | API key from resend.com |
| `YOUR_EMAIL` | Where booking notification emails are sent |
| `NEXT_PUBLIC_BOOKING_DURATION_MINUTES` | Slot length in minutes (default: 30) |

---

## Customization

- **Intake questions**: edit `HELP_OPTIONS`, `BUDGET_OPTIONS`, `TIMELINE_OPTIONS` in `src/types/booking.ts`
- **Working hours**: change `WORK_START_HOUR` / `WORK_END_HOUR` in `src/lib/google-calendar.ts`
- **Branding**: update the sidebar copy in `src/components/booking/Sidebar.tsx`
- **Call duration**: change `NEXT_PUBLIC_BOOKING_DURATION_MINUTES` in `.env.local`
