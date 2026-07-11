interface CloudflareEnv {
  PROFILE_VIEWS: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  };
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REFRESH_TOKEN: string;
  GOOGLE_CALENDAR_ID: string;
  RESEND_API_KEY: string;
  YOUR_EMAIL: string;
  NEXT_PUBLIC_BOOKING_DURATION_MINUTES: string;
  NEXT_PUBLIC_BASE_PATH: string;
}
