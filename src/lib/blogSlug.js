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
  const storedSlug = slugifyBlogTitle(update.slug);
  if (storedSlug) return storedSlug;
  const id = update.id?.toString();
  const titleSlug = slugifyBlogTitle(update.title);
  if (id && titleSlug) return `${id}-${titleSlug}`;
  return id || titleSlug;
}

export function getBlogPath(update) {
  const slug = getBlogSlug(update);
  return slug ? `/blogs/${slug}` : "/blogs";
}

export function getNumericBlogId(routeKey = "") {
  const match = routeKey.toString().match(/^(\d+)(?:-|$)/);
  return match?.[1] || null;
}
