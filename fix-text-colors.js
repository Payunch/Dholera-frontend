const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
let changedFiles = 0;

const replacements = {
    'text-slate-900': 'text-slate-900 dark:text-white',
    'text-slate-800': 'text-slate-800 dark:text-slate-200',
    'text-slate-700': 'text-slate-700 dark:text-slate-300',
    'text-slate-600': 'text-slate-600 dark:text-slate-400',
    'text-gray-900': 'text-gray-900 dark:text-white',
    'text-gray-800': 'text-gray-800 dark:text-gray-200',
    'text-gray-700': 'text-gray-700 dark:text-gray-300',
    'text-gray-600': 'text-gray-600 dark:text-gray-400',
    'text-zinc-900': 'text-zinc-900 dark:text-white',
    'text-zinc-800': 'text-zinc-800 dark:text-zinc-200',
    'text-zinc-700': 'text-zinc-700 dark:text-zinc-300',
    'text-zinc-600': 'text-zinc-600 dark:text-zinc-400',
    'text-neutral-900': 'text-neutral-900 dark:text-white',
    'text-neutral-800': 'text-neutral-800 dark:text-neutral-200',
    'text-neutral-700': 'text-neutral-700 dark:text-neutral-300',
    'text-neutral-600': 'text-neutral-600 dark:text-neutral-400',
    'text-stone-900': 'text-stone-900 dark:text-white',
    'text-stone-800': 'text-stone-800 dark:text-stone-200',
    'text-stone-700': 'text-stone-700 dark:text-stone-300',
    'text-stone-600': 'text-stone-600 dark:text-stone-400',
    'text-black': 'text-black dark:text-white',
};

const keys = Object.keys(replacements).join('|');
const regex = new RegExp(`\\b(${keys})\\b`, 'g');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // A simpler and robust way: 
    // We just find all matches of the keys.
    // If the match is not followed by " dark:text-" within the next 20 characters (roughly in the same class string)
    // Actually, we can split by regex and check the suffix.
    // Let's replace only if the class string doesn't already have dark:text- that corresponds to it,
    // or simply check if dark:text is anywhere in the same line. If we process line by line:
    
    let lines = content.split('\n');
    let modifiedLines = lines.map(line => {
        if (!regex.test(line)) return line;
        
        // Reset regex lastIndex
        regex.lastIndex = 0;
        
        // If the line already has a general dark:text- that might have been added manually
        // But what if it's unrelated? 
        // Let's do a more precise string manipulation:
        return line.replace(regex, (match, p1, offset, string) => {
            // Check if there is already a dark:text- right after this
            const afterMatch = string.slice(offset + match.length);
            if (afterMatch.trimStart().startsWith('dark:text-')) {
                return match; // Already handled
            }
            // Check if dark:text- is present somewhere else in the same line.
            // If it is, user might have put dark:text- elsewhere in the className string.
            // But sometimes a line has multiple classNames. We'll just append it unless dark:text- is in the same line.
            if (string.includes('dark:text-')) {
                 // To be very safe, if dark:text- is anywhere in the line, don't auto-replace to avoid conflicts
                 return match;
            }
            
            return replacements[match];
        });
    });

    content = modifiedLines.join('\n');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Total files changed: ${changedFiles}`);
