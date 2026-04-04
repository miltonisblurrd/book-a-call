/**
 * One-time script to get a Google OAuth refresh token.
 * Run: npm run auth
 *
 * Prerequisites:
 *   1. Create OAuth 2.0 credentials in Google Cloud Console (Web Application type)
 *   2. Add http://localhost:3000 as an authorized redirect URI
 *   3. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local
 */

import { google } from "googleapis";
import * as readline from "readline";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n❌  Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env.local\n"
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/calendar"],
});

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
    const { tokens } = await oauth2Client.getToken(code.trim());
    console.log("\n✅  Success! Add these to your .env.local:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    console.log(
      "─────────────────────────────────────────────\n"
    );
  } catch (err) {
    console.error("\n❌  Failed to exchange code:", err);
  }
});
