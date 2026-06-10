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
      
      // Remove dark mode shadows
      let newContent = content.replace(/dark:shadow-(white|black)\/\d+/g, '');
      
      // Clean up extra spaces
      newContent = newContent.replace(/ +/g, ' ').replace(/ \"/g, '"').replace(/ \'/g, "'").replace(/ `/g, '`');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Updated ' + fullPath);
      }
    }
  }
}

processDir('Dholera-frontend/src');