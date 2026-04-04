/**
 * One-time script to get a Google OAuth refresh token.
 * Run: npm run auth
 *
 * Prerequisites:
 *   1. Create OAuth 2.0 credentials in Google Cloud Console (Web Application type)
 *   2. Add http://localhost:3000 as an authorized redirect URI
 *   3. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local
 */

import * as readline from "readline";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000";
const SCOPE = "https://www.googleapis.com/auth/calendar";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n❌  Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env.local\n"
  );
  process.exit(1);
}

const params = new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope: SCOPE,
  access_type: "offline",
  prompt: "consent",
});

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

console.log("\n─────────────────────────────────────────────");
console.log("  Google Calendar OAuth Setup");
console.log("─────────────────────────────────────────────");
console.log("\n1. Open this URL in your browser:\n");
console.log(`   ${authUrl}\n`);
console.log("2. Sign in and grant access.");
console.log("3. You'll be redirected to localhost:3000?code=...");
console.log("   Copy the 'code' value from the URL.\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste the code here: ", async (code) => {
  rl.close();
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code.trim(),
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await res.json() as { refresh_token?: string; error?: string };

    if (tokens.error || !tokens.refresh_token) {
      console.error("\n❌  Failed:", tokens.error ?? "No refresh token returned");
      return;
    }

    console.log("\n✅  Success! Add this to your .env.local:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    console.log("─────────────────────────────────────────────\n");
  } catch (err) {
    console.error("\n❌  Failed to exchange code:", err);
  }
});
