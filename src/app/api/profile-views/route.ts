import { NextResponse } from "next/server";

const BASE_VIEWS = 1000;
const KV_KEY = "profile-views-count";

type KVBinding = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

async function incrementViaKv(): Promise<number | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const kv = (env as unknown as { PROFILE_VIEWS?: KVBinding }).PROFILE_VIEWS;
    if (!kv) return null;

    const current = Number(await kv.get(KV_KEY)) || BASE_VIEWS;
    const next = current + 1;
    await kv.put(KV_KEY, String(next));
    return next;
  } catch {
    return null;
  }
}

// Local `next dev` has no KV binding, so persist to a file instead.
async function incrementViaFile(): Promise<number | null> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const file = path.join(process.cwd(), ".profile-views");

    let current = BASE_VIEWS;
    try {
      current = Number(fs.readFileSync(file, "utf8")) || BASE_VIEWS;
    } catch {
      // First run: file doesn't exist yet.
    }

    const next = current + 1;
    fs.writeFileSync(file, String(next));
    return next;
  } catch {
    return null;
  }
}

export async function POST() {
  const views = (await incrementViaKv()) ?? (await incrementViaFile());
  return NextResponse.json({ views: views ?? BASE_VIEWS });
}
