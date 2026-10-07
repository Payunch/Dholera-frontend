export function slugifyBlogTitle(value = "") {
  if (value == null) return "";
  return value
    .toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function getBlogSlug(update) {
  if (!update) return "";
  const slugTarget = update.original_slug || update.slug;
  const storedSlug = slugifyBlogTitle(slugTarget);
  if (storedSlug) return storedSlug;
  const id = update.id?.toString();
  const titleTarget = update.original_title || update.title;
  const titleSlug = slugifyBlogTitle(titleTarget);
  if (id && titleSlug) return `${id}-${titleSlug}`;
  return id || titleSlug;
}

export function getBlogPath(update) {
  const slug = getBlogSlug(update);
  if (!slug) return "/blogs";
  const lang = update.lang;
  if (lang && lang !== 'en') {
    return `/${lang}/blogs/${slug}`;
  }
  return `/blogs/${slug}`;
}

export function getNumericBlogId(routeKey = "") {
  const match = routeKey.toString().match(/^(\d+)(?:-|$)/);
  return match?.[1] || null;
}
