const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetDir = 'C:\\Desktop\\JR\\Dholera\\Dholera-frontend\\src';
let count = 0;

walkDir(targetDir, (filePath) => {
    if (!filePath.match(/\.(tsx|ts|jsx|js)$/)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // A class string can be in quotes: "..." or template literals `...`
    // We'll replace bg-white inside any block of quote/backtick if dark:bg- isn't in it.
    
    // We can do a replace with a callback on all string literals and template literals.
    // However, JS regex for matching any quotes/backticks:
    let regex = /(['"`])(.*?)\1/gs;
    
    content = content.replace(regex, (match, quote, inner) => {
        // If it doesn't contain bg-white, just return it
        if (!/(?<![\w-])bg-white(?![\w/-])/.test(inner)) return match;
        
        let modifiedInner = inner;

        // Check for hover:bg-white
        if (/(?<![\w-])hover:bg-white(?![\w/-])/.test(modifiedInner)) {
            if (!/dark:hover:bg-/.test(modifiedInner)) {
                modifiedInner = modifiedInner.replace(/(?<![\w-])hover:bg-white(?![\w/-])/g, 'hover:bg-white dark:hover:bg-slate-800');
            }
        }

        // Check for bg-white
        if (/(?<![\w-])bg-white(?![\w/-])/.test(modifiedInner)) {
            if (!/dark:bg-/.test(modifiedInner)) {
                // Determine if it looks like a wrapper (e.g., contains min-h-screen, p-8, container)
                if (/(min-h-screen|h-screen|max-w-7xl|container|pt-24)/.test(modifiedInner)) {
                    modifiedInner = modifiedInner.replace(/(?<![\w-])bg-white(?![\w/-])/g, 'bg-white dark:bg-slate-950');
                } else {
                    modifiedInner = modifiedInner.replace(/(?<![\w-])bg-white(?![\w/-])/g, 'bg-white dark:bg-slate-900');
                }
            }
        }
        
        return quote + modifiedInner + quote;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        count++;
        console.log("Updated", filePath);
    }
});

console.log(`Total files updated: ${count}`);
