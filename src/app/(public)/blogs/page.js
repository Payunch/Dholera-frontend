import { cookies } from "next/headers";
import { getUpdates } from "@/features/updates/api";
import BlogsClient from "./BlogsClient";

export const dynamic = "force-dynamic";

export default async function BlogsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const cookieStore = await cookies();
  const lang = resolvedSearchParams?.explicitLang || cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value || 'en';
  
  let updates = [];
  let hasError = false;

  try {
    updates = await getUpdates(undefined, lang);
  } catch (error) {
    console.error("Failed to fetch updates:", error);
    try {
      updates = await getUpdates();
    } catch (fallbackError) {
      console.error("Fallback fetch also failed:", fallbackError);
      hasError = true;
    }
  }

  return <BlogsClient initialUpdates={updates} hasError={hasError} />;
}
