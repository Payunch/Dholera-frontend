/**
 * Dynamic FAQPage JSON-LD Schema Extractor
 * Automatically inspects HTML articles / blogs for question-and-answer pairs
 * and compiles official Google FAQPage rich structured data.
 */

export function extractFaqSchema(content = "") {
  if (!content || typeof content !== "string") return null;

  const faqs = [];
  
  // Pattern 1: Card-inset containers: <div ...card-inset...><h3...>(question)</h3><p...>(answer)</p>
  const cardRegex = /<div[^>]*class=["'][^"']*card-inset[^"']*["'][^>]*>\s*<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gis;
  let match;
  while ((match = cardRegex.exec(content)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, "").trim();
    const a = match[2].replace(/<[^>]*>/g, "").trim();
    if (q && a && (q.endsWith("?") || q.length > 10)) {
      faqs.push({ q, a });
    }
  }

  // Pattern 2: Generic h3 followed by p inside an FAQ section
  if (faqs.length === 0) {
    const faqSectionMatch = content.match(/<h[23][^>]*>\s*(?:faq|frequently asked|questions)[\s\S]*?(?:<h2|$)/i);
    if (faqSectionMatch) {
      const section = faqSectionMatch[0];
      const qaRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gis;
      while ((match = qaRegex.exec(section)) !== null) {
        const q = match[1].replace(/<[^>]*>/g, "").trim();
        const a = match[2].replace(/<[^>]*>/g, "").trim();
        if (q && a && (q.endsWith("?") || q.length > 8)) {
          faqs.push({ q, a });
        }
      }
    }
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
