const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for className="..." and if it has bg-white but no dark:bg-, append dark:bg-slate-900
      let newContent = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classList) => {
        if (classList.includes('bg-white') && !classList.match(/dark:bg-[a-zA-Z0-9-]+/)) {
          // If it's a page layout container, we might want slate-950, but slate-900 is safe and dark.
          return `className=${quote}${classList} dark:bg-slate-900${quote}`;
        }
        return match;
      });
      
      // Also handle classNames in cn() arrays or template literals if they are simple strings
      // e.g. "bg-white p-4"
      newContent = newContent.replace(/(["'])(.*?bg-white.*?)\1/g, (match, quote, classList) => {
        if (!match.includes('className=') && classList.includes('bg-white') && !classList.match(/dark:bg-[a-zA-Z0-9-]+/)) {
            // avoid replacing if it's not a list of classes, but mostly safe in TSX
            if (classList.includes(' ') || classList === 'bg-white') {
                 return `${quote}${classList} dark:bg-slate-900${quote}`;
            }
        }
        return match;
      });

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Fixed missing dark:bg in ' + fullPath);
      }
    }
  }
}

processDir('Dholera-frontend/src');
