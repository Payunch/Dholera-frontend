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

  // Make tables responsive with stacked-card labels for mobile viewports
  parsedContent = makeTablesResponsive(parsedContent);

  return (
    <div 
      className="wp-content mt-6 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-loose"
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  );
}
