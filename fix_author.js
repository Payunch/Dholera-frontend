const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/blogs/[slug]/page.js', 'utf8');

// Replace 1: authors array in metadata
content = content.replace(/authors:\s*\[\{\s*name:\s*update\.author\s*\|\|\s*"Naresh Gohel",\s*url:\s*"\/author\/naresh-gohel"\s*\}\]/g, 'authors: [{ name: "Naresh Gohel", url: "/author/naresh-gohel" }]');

// Replace 2: authors array in openGraph
content = content.replace(/authors:\s*\[update\.author\s*\|\|\s*"Dholera Growth Team"\]/g, 'authors: ["Naresh Gohel"]');

// Replace 3: articleSchema author
content = content.replace(/author:\s*\{\s*"@type":\s*"Person",\s*name:\s*update\.author\s*\|\|\s*"Naresh Gohel"/g, 'author: { "@type": "Person", name: "Naresh Gohel"');

// Replace 4: UI author Link
content = content.replace(/>\{update\.author \|\| "Naresh Gohel"\}<\/Link>/g, '>Naresh Gohel</Link>');

// Replace 5: UI author designation
content = content.replace(/>\{update\.author \? "Author" : "Verified Analysis"\}<\/span>/g, '>Verified Analysis</span>');

fs.writeFileSync('src/app/(public)/blogs/[slug]/page.js', content, 'utf8');
console.log('Fixed authors');
