const fs = require('fs');
let code = fs.readFileSync('src/app/(public)/blogs/[slug]/page.js', 'utf8');

// Replace metadata signature
code = code.replace(
  /export async function generateMetadata\(\s*\{\s*params,\s*searchParams\s*\},\s*parent\s*\)/,
  'export async function generateMetadata({ params, searchParams, explicitLang }, parent)'
);

// Replace default component signature
code = code.replace(
  /export default async function UpdateDetailPage\(\{ params, searchParams \}\) \{/,
  'export default async function UpdateDetailPage({ params, searchParams, explicitLang }) {'
);

// Replace lang assignment in both places
code = code.replace(
  /const lang = cookieStore\.get\('NEXT_LOCALE'\)\?\.value \|\| cookieStore\.get\('preferred_language'\)\?\.value \|\|'en';/g,
  "const lang = explicitLang || cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value || 'en';"
);

fs.writeFileSync('src/app/(public)/blogs/[slug]/page.js', code);
console.log("Patched page.js successfully.");
