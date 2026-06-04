const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Pattern 1: z-0 opacity-100 pointer-events-none (Home/AboutUs headers)
  content = content.replace(/className="absolute inset-0 z-0 opacity-100 pointer-events-none"/g, 'className="absolute inset-0 z-0 opacity-60 pointer-events-none"');
  
  // Pattern 2: z-0 opacity-100 transition-opacity (Founder card)
  content = content.replace(/className="absolute inset-0 z-0 opacity-100 transition-opacity/g, 'className="absolute inset-0 z-0 opacity-60 transition-opacity');
  
  // Pattern 3: z-0 opacity-20 mix-blend-overlay pointer-events-none (Various headers)
  content = content.replace(/className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none"/g, 'className="absolute inset-0 z-0 opacity-60 pointer-events-none"');

  // Pattern 4: z-0 opacity-10 mix-blend-overlay pointer-events-none (HomeClient old overlay)
  content = content.replace(/className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"/g, 'className="absolute inset-0 z-0 opacity-60 pointer-events-none"');

  // Pattern 5: z-0 opacity-30 (Infrastructure)
  content = content.replace(/className="absolute inset-0 z-0 opacity-30"/g, 'className="absolute inset-0 z-0 opacity-60"');

  // Pattern 6: z-0 opacity-10 pointer-events-none group-hover:scale-105 (Site Visit Card)
  content = content.replace(/className="absolute inset-0 z-0 opacity-10 pointer-events-none group-hover:scale-105/g, 'className="absolute inset-0 z-0 opacity-60 pointer-events-none group-hover:scale-105');

  // Pattern 7: airport image (if opacity-40 is used)
  content = content.replace(/className="object-cover opacity-40"/g, 'className="object-cover opacity-60"');

  // Remove the dark overlays left over in HomeClient
  content = content.replace(/<div className="absolute inset-0 bg-slate-950\/60" \/>/g, '');
  content = content.replace(/<div className="absolute inset-0 bg-\[\#0B132B\]\/60" \/>/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('src');
