"use client";

import { Share2 } from "lucide-react";

export function ShareButton({ title, text, url }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="rounded-full border-2 border-slate-100 p-2 text-slate-400 transition-all hover:border-orange-600 hover:text-orange-600"
      title="Share this article"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
}
