const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace black shadows
  content = content.replace(/dark:shadow-black\/(\d+)/g, (match, opacity) => {
    let op = parseInt(opacity, 10);
    if (op >= 95) return 'dark:shadow-white/10';
    return 'dark:shadow-white/5';
  });

  // Replace colored shadows
  content = content.replace(/dark:shadow-([a-z]+(?:-\d+)?)\/(\d+)/g, (match, color, opacity) => {
    // Skip neutral colors
    if (['black', 'white', 'slate', 'gray', 'zinc', 'neutral', 'stone'].some(c => color.startsWith(c))) {
      return match;
    }
    
    let op = parseInt(opacity, 10);
    let newOp = op + 20;
    if (newOp > 100) newOp = 100;
    
    return `dark:shadow-${color}/${newOp}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

const srcDir = path.join(__dirname, 'src');

['app', 'features', 'components'].forEach(folder => {
  const targetDir = path.join(srcDir, folder);
  walkDir(targetDir, processFile);
});

console.log('Done fixing dark shadows.');
