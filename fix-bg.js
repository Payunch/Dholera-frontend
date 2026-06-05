const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Safely swap backgrounds
  content = content.replace(/bg-\[\#0B132B\]/g, 'bg-white dark:bg-[#0B132B]');
  content = content.replace(/(?<!dark:)bg-slate-950(?![\/\-\w])/g, 'bg-slate-50 dark:bg-slate-950');
  content = content.replace(/(?<!dark:)bg-slate-900(?![\/\-\w])/g, 'bg-white dark:bg-slate-900');
  
  // Safely swap text colors on specific typography tags to avoid ruining buttons
  // Using a replacer function to avoid any $1 variable evaluation bugs in shells
  content = content.replace(/(<(?:h1|h2|h3|h4|p|span|div)[^>]*?)text-white/g, (match, p1) => {
    return p1 + 'text-slate-900 dark:text-white';
  });

  content = content.replace(/(<(?:h1|h2|h3|h4|p|span|div)[^>]*?)text-slate-300/g, (match, p1) => {
    return p1 + 'text-slate-600 dark:text-slate-300';
  });

  content = content.replace(/(<(?:h1|h2|h3|h4|p|span|div)[^>]*?)text-slate-400/g, (match, p1) => {
    return p1 + 'text-slate-500 dark:text-slate-400';
  });

  content = content.replace(/(<(?:h1|h2|h3|h4|p|span|div)[^>]*?)text-slate-200/g, (match, p1) => {
    return p1 + 'text-slate-700 dark:text-slate-200';
  });

  fs.writeFileSync(f, content);
});

console.log("Safely swapped layout colors across all TSX files.");
