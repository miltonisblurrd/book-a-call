import { redirect } from "next/navigation";

/** Legacy path — coming soon now lives at `/`. */
export default function ComingSoonRedirect() {
  redirect("/");
}
