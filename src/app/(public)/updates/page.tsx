import { Metadata } from "next";
import { getUpdates } from "@/features/updates/api";
import { UpdatesListing } from "@/features/updates/components/UpdatesListing";

export const metadata: Metadata = {
  title: "Dholera Growth Updates | Official Milestone Analysis",
  description: "Explore verified milestones, infrastructure progress, and policy updates in Dholera Smart City. Strategic intel for DSIR land investors.",
};

export default async function UpdatesPage() {
  const updates = await getUpdates();

  return (
    <div className="bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-600">
            Real-Time Intelligence
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl uppercase">
            Growth <span className="text-orange-600 italic">Evidence</span> & Updates
          </h1>
          <p className="max-w-2xl text-lg font-medium text-slate-500">
            Stay ahead of the curve with deep-dive analysis on Dholera SIR development, 
            industrial land allotments, and official policy announcements.
          </p>
        </header>

        <UpdatesListing initialUpdates={updates} />
      </div>
    </div>
  );
}
