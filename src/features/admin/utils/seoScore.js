const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const makeSlug = (value = "") => value
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/[\s-]+/g, "-")
  .replace(/^-|-$/g, "");

export function getSeoReview({ title, content, focusKeyword, seoTitle, seoDescription, slug, imageUrl, imageAltText, tags }) {
  const rawKeywords = (focusKeyword || tags || "").split(",").map(k => k.trim()).filter(Boolean);
  const keyword = (rawKeywords[0] || (title || "").split(":")[0] || "").trim().toLowerCase();
  const cleanContent = stripHtml(content);
  const wordCount = cleanContent ? cleanContent.split(/\s+/).length : 0;
  const headingText = (content.match(/<h[23][^>]*>(.*?)<\/h[23]>/gi) || []).join(" ").toLowerCase();
  const keywordMatches = keyword ? (cleanContent.toLowerCase().match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length : 0;
  const density = wordCount ? (keywordMatches / wordCount) * 100 : 0;
  const externalLinks = (content.match(/<a\s+[^>]*href=["']https?:\/\//gi) || []).length;
  const internalLinks = (content.match(/<a\s+[^>]*href=["']\//gi) || []).length;
  const faqs = (content.match(/<h[23][^>]*>\s*(?:faq|frequently asked|what |how |is |can |when |why )/gi) || []).length;
  
  const kwSlug = makeSlug(keyword);
  const slugHasKeyword = Boolean(keyword) && (slug.includes(kwSlug) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => slug.includes(w)));
  const titleHasKeyword = Boolean(keyword) && (seoTitle.toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => seoTitle.toLowerCase().includes(w)));
  const descHasKeyword = Boolean(keyword) && (seoDescription.toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => seoDescription.toLowerCase().includes(w)));

  const checks = [
    ["Primary keyword is set", Boolean(keyword), 6],
    ["SEO title is 45–65 characters", seoTitle.length >= 45 && seoTitle.length <= 65, 12],
    ["SEO title includes the keyword", titleHasKeyword, 6],
    ["Meta description is 135–165 characters", seoDescription.length >= 135 && seoDescription.length <= 165, 10],
    ["Meta description includes the keyword", descHasKeyword, 5],
    ["URL is short and includes the keyword", slug.length >= 3 && slug.length <= 80 && slugHasKeyword, 6],
    ["Keyword appears in the opening paragraph", Boolean(keyword) && (stripHtml(content).slice(0, 450).toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => stripHtml(content).slice(0, 450).toLowerCase().includes(w))), 8],
    ["Keyword appears in a heading", Boolean(keyword) && (headingText.includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => headingText.includes(w))), 6],
    ["Natural keyword density (0.4–2.0%)", density >= 0.4 && density <= 2.5, 5],
    ["Article has 1,000+ words", wordCount >= 1000, 8],
    ["At least three H2/H3 sections", (content.match(/<h[23][^>]*>/gi) || []).length >= 3, 4],
    ["Cover image is selected", Boolean(imageUrl), 4],
    ["Image ALT text includes the keyword", Boolean(imageAltText) && Boolean(keyword) && (imageAltText.toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => imageAltText.toLowerCase().includes(w))), 5],
    ["2–5 internal links", internalLinks >= 2 && internalLinks <= 6, 5],
    ["1–3 authority external links", externalLinks >= 1 && externalLinks <= 4, 5],
    ["FAQ section has questions", faqs >= 3, 3],
    ["Four to eight relevant tags", tags.split(",").map(tag => tag.trim()).filter(Boolean).length >= 4 && tags.split(",").filter(Boolean).length <= 10, 2],
  ];
  const score = checks.filter(([, passed]) => passed).reduce((total, [, , points]) => total + points, 0);
  return { score, checks, wordCount, density: Number(density.toFixed(2)), internalLinks, externalLinks, faqs };
}
