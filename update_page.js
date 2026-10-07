const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'page.js');
let content = fs.readFileSync(filePath, 'utf8');

const target = `export default async function HomePage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value || 'en';`;

const targetWin = target.replace(/\n/g, '\r\n');

const replacement = `export default async function HomePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const cookieStore = await cookies();
  const lang = resolvedSearchParams?.explicitLang || cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value || 'en';`;

content = content.replace(target, replacement);
content = content.replace(targetWin, replacement);

fs.writeFileSync(filePath, content);
console.log('page.js updated');
