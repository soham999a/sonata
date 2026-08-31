"use client";

import { Copy, Share2 } from "lucide-react";

export function EntryTools({ name, slug }: { name: string; slug: string }) {
  const href = `/entries/${slug}`;
  const copyRecordLink = async () => {
    try {
      await navigator.clipboard?.writeText(href);
    } catch {
      /* clipboard unavailable */
    }
  };
  const shareRecord = async () => {
    const url = href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${name} — Sonata`, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard?.writeText(url);
    } catch {
      /* no clipboard */
    }
  };

  return (
    <div className="entry-reading__tools" aria-label="Record tools">
      <button type="button" className="icon-button" aria-label="Copy record link" title="Copy record link" onClick={copyRecordLink}>
        <Copy size={16} strokeWidth={1.6} />
      </button>
      <button type="button" className="icon-button" aria-label="Share record" title="Share record" onClick={shareRecord}>
        <Share2 size={16} strokeWidth={1.6} />
      </button>
    </div>
  );
}
