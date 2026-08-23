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
  const keyword = focusKeyword.trim().toLowerCase();
  const cleanContent = stripHtml(content);
  const wordCount = cleanContent ? cleanContent.split(/\s+/).length : 0;
  const headingText = (content.match(/<h[23][^>]*>(.*?)<\/h[23]>/gi) || []).join(" ").toLowerCase();
  const keywordMatches = keyword ? (cleanContent.toLowerCase().match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length : 0;
  const density = wordCount ? (keywordMatches / wordCount) * 100 : 0;
  const externalLinks = (content.match(/<a\s+[^>]*href=["']https?:\/\//gi) || []).length;
  const internalLinks = (content.match(/<a\s+[^>]*href=["']\//gi) || []).length;
  const faqs = (content.match(/<h[23][^>]*>\s*(?:faq|frequently asked|what |how |is |can |when |why )/gi) || []).length;
  const checks = [
    ["Primary keyword is set", Boolean(keyword), 6],
    ["SEO title is 50–60 characters", seoTitle.length >= 50 && seoTitle.length <= 60, 12],
    ["SEO title includes the keyword", Boolean(keyword) && seoTitle.toLowerCase().includes(keyword), 6],
    ["Meta description is 140–160 characters", seoDescription.length >= 140 && seoDescription.length <= 160, 10],
    ["Meta description includes the keyword", Boolean(keyword) && seoDescription.toLowerCase().includes(keyword), 5],
    ["URL is short and includes the keyword", slug.length >= 3 && slug.length <= 70 && Boolean(keyword) && slug.includes(makeSlug(keyword)), 6],
    ["Keyword appears in the opening paragraph", Boolean(keyword) && stripHtml(content).slice(0, 350).toLowerCase().includes(keyword), 8],
    ["Keyword appears in a heading", Boolean(keyword) && headingText.includes(keyword), 6],
    ["Natural keyword density (0.5–1.5%)", density >= 0.5 && density <= 1.5, 5],
    ["Article has 1,200+ words", wordCount >= 1200, 8],
    ["At least three H2/H3 sections", (content.match(/<h[23][^>]*>/gi) || []).length >= 3, 4],
    ["Cover image is selected", Boolean(imageUrl), 4],
    ["Image ALT text includes the keyword", Boolean(imageAltText) && Boolean(keyword) && imageAltText.toLowerCase().includes(keyword), 5],
    ["3–5 internal links", internalLinks >= 3 && internalLinks <= 5, 5],
    ["2–3 authority external links", externalLinks >= 2 && externalLinks <= 3, 5],
    ["FAQ section has four or more questions", faqs >= 4, 3],
    ["Five to eight relevant tags", tags.split(",").map(tag => tag.trim()).filter(Boolean).length >= 5 && tags.split(",").filter(Boolean).length <= 8, 2],
  ];
  const score = checks.filter(([, passed]) => passed).reduce((total, [, , points]) => total + points, 0);
  return { score, checks, wordCount, density: Number(density.toFixed(2)), internalLinks, externalLinks, faqs };
}
