const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const makeSlug = (value = "") => value
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/[\s-]+/g, "-")
  .replace(/^-|-$/g, "");

export function getSeoReview({
  title = "",
  content = "",
  focusKeyword = "",
  seoTitle = "",
  seoDescription = "",
  slug = "",
  imageUrl = "",
  imageAltText = "",
  tags = ""
} = {}) {
  const safeTitle = (title || "").toString();
  const safeContent = (content || "").toString();
  const safeFocusKeyword = (focusKeyword || "").toString();
  const safeSeoTitle = (seoTitle || safeTitle || "").toString();
  const safeSeoDescription = (seoDescription || "").toString();
  const safeSlug = (slug || "").toString();
  const safeImageAltText = (imageAltText || "").toString();
  const safeTags = (tags || "").toString();

  const rawKeywords = (safeFocusKeyword || safeTags || "").split(",").map(k => k.trim()).filter(Boolean);
  const keyword = (rawKeywords[0] || safeTitle.split(":")[0] || "").trim().toLowerCase();
  const cleanContent = stripHtml(safeContent);
  const wordCount = cleanContent ? cleanContent.split(/\s+/).length : 0;
  const headingText = (safeContent.match(/<h[23][^>]*>(.*?)<\/h[23]>/gi) || []).join(" ").toLowerCase();
  const keywordMatches = keyword ? (cleanContent.toLowerCase().match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length : 0;
  const density = wordCount ? (keywordMatches / wordCount) * 100 : 0;
  const externalLinks = (safeContent.match(/<a\s+[^>]*href=["']https?:\/\//gi) || []).length;
  const internalLinks = (safeContent.match(/<a\s+[^>]*href=["']\//gi) || []).length;
  const faqs = (safeContent.match(/<h[23][^>]*>\s*(?:faq|frequently asked|what |how |is |can |when |why )/gi) || []).length;
  
  const kwSlug = makeSlug(keyword);
  const slugHasKeyword = Boolean(keyword) && (safeSlug.includes(kwSlug) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => safeSlug.includes(w)));
  const titleHasKeyword = Boolean(keyword) && (safeSeoTitle.toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => safeSeoTitle.toLowerCase().includes(w)));
  const descHasKeyword = Boolean(keyword) && (safeSeoDescription.toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => safeSeoDescription.toLowerCase().includes(w)));

  const checks = [
    ["Primary keyword is set", Boolean(keyword), 6],
    ["SEO title is 45–65 characters", safeSeoTitle.length >= 45 && safeSeoTitle.length <= 65, 12],
    ["SEO title includes the keyword", titleHasKeyword, 6],
    ["Meta description is 135–165 characters", safeSeoDescription.length >= 135 && safeSeoDescription.length <= 165, 10],
    ["Meta description includes the keyword", descHasKeyword, 5],
    ["URL is short and includes the keyword", safeSlug.length >= 3 && safeSlug.length <= 80 && slugHasKeyword, 6],
    ["Keyword appears in the opening paragraph", Boolean(keyword) && (cleanContent.slice(0, 450).toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => cleanContent.slice(0, 450).toLowerCase().includes(w))), 8],
    ["Keyword appears in a heading", Boolean(keyword) && (headingText.includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => headingText.includes(w))), 6],
    ["Natural keyword density (0.4–2.0%)", density >= 0.4 && density <= 2.5, 5],
    ["Article has 1,000+ words", wordCount >= 1000, 8],
    ["At least three H2/H3 sections", (safeContent.match(/<h[23][^>]*>/gi) || []).length >= 3, 4],
    ["Cover image is selected", Boolean(imageUrl), 4],
    ["Image ALT text includes the keyword", Boolean(safeImageAltText) && Boolean(keyword) && (safeImageAltText.toLowerCase().includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => safeImageAltText.toLowerCase().includes(w))), 5],
    ["2–5 internal links", internalLinks >= 2 && internalLinks <= 6, 5],
    ["1–3 authority external links", externalLinks >= 1 && externalLinks <= 4, 5],
    ["FAQ section has questions", faqs >= 3, 3],
    ["Four to eight relevant tags", safeTags.split(",").map(tag => tag.trim()).filter(Boolean).length >= 4 && safeTags.split(",").filter(Boolean).length <= 10, 2],
  ];
  const score = checks.filter(([, passed]) => passed).reduce((total, [, , points]) => total + points, 0);
  return { score, checks, wordCount, density: Number(density.toFixed(2)), internalLinks, externalLinks, faqs };
}
