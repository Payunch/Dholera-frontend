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
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let modified = false;

  const replacePatterns = [
    {
      regex: /className="bg-slate-50 min-h-screen([^"]*)"/g,
      replacement: 'className="bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen$1"'
    },
    {
      regex: /className="bg-white min-h-screen([^"]*)"/g,
      replacement: 'className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen$1"'
    },
    {
      regex: /className="min-h-screen bg-slate-50([^"]*)"/g,
      replacement: 'className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300$1"'
    },
    {
      regex: /className="bg-white pt-24 pb-32 min-h-screen"/g,
      replacement: 'className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-24 pb-32 min-h-screen"'
    }
  ];

  replacePatterns.forEach(({ regex, replacement }) => {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});

console.log('Done');
