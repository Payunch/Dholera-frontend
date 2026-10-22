import React from "react";

function makeTablesResponsive(html) {
  if (!html || !html.includes("<table")) return html;

  return html.replace(/<table([\s\S]*?)<\/table>/gi, (tableMatch) => {
    // Extract headers from thead
    const headerMatches = [...tableMatch.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)];
    const headers = headerMatches.map((m) => m[1].replace(/<[^>]+>/g, "").trim());

    if (headers.length === 0) return tableMatch;

    // Process rows
    return tableMatch.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (rowMatch, rowInner) => {
      // Skip the header row itself
      if (rowMatch.includes("<th")) return rowMatch;

      let colIdx = 0;
      const updatedRowInner = rowInner.replace(/<td([^>]*)>([\s\S]*?)<\/td>/gi, (tdMatch, tdAttrs, tdContent) => {
        const label = headers[colIdx] || "";
        colIdx++;
        if (!tdAttrs.includes("data-label=")) {
          const safeLabel = label.replace(/"/g, "&quot;");
          return `<td${tdAttrs} data-label="${safeLabel}">${tdContent}</td>`;
        }
        return tdMatch;
      });

      return rowMatch.replace(rowInner, updatedRowInner);
    });
  });
}

function expandShortcodes(html) {
  if (!html) return html;

  const rateSheetCtaHtml = `
<div class="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 not-prose">
  <div class="space-y-2 text-center md:text-left">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 text-[10px] font-black uppercase tracking-wider">
      <span class="w-2 h-2 rounded-full bg-orange-500"></span>
      Investor Intelligence • Ready Possession Plots
    </div>
    <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tight text-white m-0">Compare TP1 vs TP2 Plug-and-Play Plot Rates</h3>
    <p class="text-xs sm:text-sm text-slate-300 max-w-xl m-0 leading-relaxed">
      Request the verified 2026 per-sq-yard valuation index, duct connectivity verification, and approved NA/NOC inventory delivered directly to you.
    </p>
  </div>
  <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
    <a href="/contact?intent=rate-sheet" class="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-wider text-center shadow-lg shadow-orange-600/30 transition-all font-sans">
      Request Rate Sheet
    </a>
    <a href="https://wa.me/918200448270?text=Hi%20Naresh,%20I%20am%20reading%20about%20Dholera%20utility%20ducts%20and%20would%20like%20to%20compare%20TP1%20vs%20TP2%20plot%20rates." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider text-center transition-all font-sans">
      WhatsApp Instant
    </a>
  </div>
</div>
`;

  const siteVisitCtaHtml = `
<div class="relative overflow-hidden my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B0F19] to-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 not-prose">
  <div class="space-y-2 text-center md:text-left">
    <span class="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-wider">
      Complimentary Ground Service
    </span>
    <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tight text-white m-0">Book Free Dholera SIR Site Visit (Cab Provided)</h3>
    <p class="text-xs sm:text-sm text-slate-300 max-w-xl m-0 leading-relaxed">
      Inspect trunk utility ducts, ABCD building, expressway interchanges, and vetted TP plots with our ground development team. Pick-up from Ahmedabad / Vadodara.
    </p>
  </div>
  <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
    <a href="/#site-visit" class="px-7 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-orange-600 text-white text-xs font-black uppercase tracking-wider text-center shadow-xl shadow-orange-600/20 transition-all font-sans">
      Book Free Cab
    </a>
  </div>
</div>
`;

  const whatsappCtaHtml = `
<div class="my-10 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 not-prose">
  <div class="space-y-2 text-center md:text-left">
    <span class="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
      Direct Advisory
    </span>
    <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tight text-white m-0">Consult Directly with Naresh Gohel on WhatsApp</h3>
    <p class="text-xs sm:text-sm text-slate-300 max-w-xl m-0 leading-relaxed">
      Get immediate title search verification, plot demarcation coordinates, and off-market commercial/industrial opportunities.
    </p>
  </div>
  <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
    <a href="https://wa.me/918200448270?text=Hi%20Naresh,%20I%20would%20like%20a%20one-to-one%20consultation%20regarding%20Dholera%20SIR%20plots." target="_blank" rel="noopener noreferrer" class="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider text-center shadow-lg transition-all font-sans">
      Chat on WhatsApp
    </a>
  </div>
</div>
`;

  return html
    .replace(/<p>\s*\{\{\s*cta_rate_sheet\s*\}\}\s*<\/p>|\{\{\s*cta_rate_sheet\s*\}\}/gi, rateSheetCtaHtml)
    .replace(/<p>\s*\{\{\s*cta_tp_rates\s*\}\}\s*<\/p>|\{\{\s*cta_tp_rates\s*\}\}/gi, rateSheetCtaHtml)
    .replace(/<p>\s*\{\{\s*cta_site_visit\s*\}\}\s*<\/p>|\{\{\s*cta_site_visit\s*\}\}/gi, siteVisitCtaHtml)
    .replace(/<p>\s*\{\{\s*cta_whatsapp\s*\}\}\s*<\/p>|\{\{\s*cta_whatsapp\s*\}\}/gi, whatsappCtaHtml);
}

export function ArticleBody({ content }) {
  if (!content) return null;

  // Custom parser to handle LLM markdown artifacts and excessive bolding
  let parsedContent = content;

  // Convert markdown bold to HTML if any leaked through
  parsedContent = parsedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Un-bold entire paragraphs, list items, and table cells
  parsedContent = parsedContent.replace(/<p>\s*<strong>(.*?)<\/strong>\s*<\/p>/g, '<p>$1</p>');
  parsedContent = parsedContent.replace(/<li>\s*<strong>(.*?)<\/strong>\s*<\/li>/g, '<li>$1</li>');
  parsedContent = parsedContent.replace(/<td>\s*<strong>(.*?)<\/strong>\s*<\/td>/g, '<td>$1</td>');

  // Handle inverted bolding (strong wrapping block elements)
  parsedContent = parsedContent.replace(/<strong>\s*<p>(.*?)<\/p>\s*<\/strong>/g, '<p>$1</p>');

  // Strip any legacy trailing call/website block to avoid duplicates with BlogQuickLinks
  parsedContent = parsedContent.replace(/<p[^>]*>📞[\s\S]*$/i, '');

  // Expand dynamic platform shortcodes (e.g. {{cta_rate_sheet}}, {{cta_site_visit}})
  parsedContent = expandShortcodes(parsedContent);

  // Make tables responsive with stacked-card labels for mobile viewports
  parsedContent = makeTablesResponsive(parsedContent);

  return (
    <div
      className="wp-content mt-6 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-loose"
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  );
}
