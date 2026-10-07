const fs = require('fs');
let code = fs.readFileSync('src/app/(public)/blogs/[slug]/page.js', 'utf8');

const target = 'alternates: { canonical: `/blogs/${expectedSlug}` },';
const replacement = `alternates: { 
   canonical: \`https://www.dholeraplatform.com/blogs/\${expectedSlug}\`,
   languages: {
     'en': \`https://www.dholeraplatform.com/blogs/\${expectedSlug}\`,
     'gu': \`https://www.dholeraplatform.com/gu/blogs/\${expectedSlug}\`,
     'hi': \`https://www.dholeraplatform.com/hi/blogs/\${expectedSlug}\`,
     'x-default': \`https://www.dholeraplatform.com/blogs/\${expectedSlug}\`,
   }
 },`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/app/(public)/blogs/[slug]/page.js', code);
  console.log("Patched alternates successfully.");
} else {
  console.log("Target not found!");
}
