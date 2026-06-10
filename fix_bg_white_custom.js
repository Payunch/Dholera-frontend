const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetDir = 'C:\\Desktop\\JR\\Dholera\\Dholera-frontend\\src';

let count = 0;

walkDir(targetDir, (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.jsx') && !filePath.endsWith('.js')) {
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Replace bg-white without dark:bg-
    // Look for bg-white preceded by word boundary or start of string, followed by word boundary or end of string.
    // Actually, bg-white can be surrounded by spaces or quotes.
    // We want to avoid matching bg-white/10. So it must not be followed by /
    
    // Split the content into class strings. Or simpler:
    // Regex to match "bg-white" not followed by / and not preceded by dark:
    // Wait, regex lookbehind for dark: is complicated because it could be `dark:bg-slate-900 bg-white`.
    // It's easier to find className strings, and process them.

    // Better regex: match className="..." or className={`...`}
    // Instead of full parsing, let's just replace `bg-white` globally where not followed by `/`,
    // and if the line doesn't already contain `dark:bg-slate-`, we'll see.
    // Actually, just regex replace: /(?<![\w-])bg-white(?![\w/-])/g
    // We replace it with `bg-white dark:bg-slate-900`.
    // Wait, what if it already has `dark:bg-slate-900` somewhere else on the same element?
    // Doing it globally might duplicate `dark:bg-`. Let's just do a simple replacement and then deduplicate.

    // Actually, Tailwind classes can just be added. If `dark:bg-slate-800 dark:bg-slate-900` exists, the later one or the one in CSS wins.
    // But it's messy. Let's do a smarter approach:

    let modified = false;

    // We can use a regex to replace bg-white with bg-white dark:bg-slate-900
    // only if the same line doesn't contain dark:bg-
    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Handle bg-white
        if (/(?<![\w-])bg-white(?![\w/-])/.test(line)) {
            // Check if it already has a dark background class
            if (!/dark:bg-/.test(line)) {
                // If it looks like a page wrapper (min-h-screen), use 950, else 900
                if (line.includes('min-h-screen')) {
                    line = line.replace(/(?<![\w-])bg-white(?![\w/-])/g, 'bg-white dark:bg-slate-950');
                } else {
                    line = line.replace(/(?<![\w-])bg-white(?![\w/-])/g, 'bg-white dark:bg-slate-900');
                }
                modified = true;
            }
        }

        // Handle hover:bg-white
        if (/(?<![\w-])hover:bg-white(?![\w/-])/.test(line)) {
            if (!/dark:hover:bg-/.test(line)) {
                line = line.replace(/(?<![\w-])hover:bg-white(?![\w/-])/g, 'hover:bg-white dark:hover:bg-slate-800');
                modified = true;
            }
        }
        
        lines[i] = line;
    }

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'));
        count++;
        console.log("Updated", filePath);
    }
});

console.log(`Total files updated: ${count}`);
