const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, 'src', 'components', 'layout', 'Navbar.js');
let navbarContent = fs.readFileSync(navbarPath, 'utf8');

const targetNavbar = `                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "block w-full rounded-lg px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest transition-colors",
                        lang === l.code ? "bg-orange-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}`;

const replacementNavbar = `                  {languages.map((l) => {
                    let currentPath = pathname;
                    if (currentPath.startsWith('/hi/') || currentPath === '/hi') {
                      currentPath = currentPath.replace(/^\\/hi/, '') || '/';
                    } else if (currentPath.startsWith('/gu/') || currentPath === '/gu') {
                      currentPath = currentPath.replace(/^\\/gu/, '') || '/';
                    }
                    const localizedPath = l.code === 'en' ? currentPath : \`/\${l.code}\${currentPath === '/' ? '' : currentPath}\`;

                    return (
                      <Link
                        key={l.code}
                        href={localizedPath}
                        onClick={() => {
                          setLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "block w-full rounded-lg px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest transition-colors",
                          lang === l.code ? "bg-orange-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600"
                        )}
                      >
                        {l.label}
                      </Link>
                    );
                  })}`;

navbarContent = navbarContent.replace(targetNavbar, replacementNavbar);
// also handle windows line endings
navbarContent = navbarContent.replace(targetNavbar.replace(/\n/g, '\r\n'), replacementNavbar);
fs.writeFileSync(navbarPath, navbarContent);
console.log('Navbar updated');

const sidebarPath = path.join(__dirname, 'src', 'components', 'layout', 'SidebarDrawer.js');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

const targetSidebar = `              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all",
                    lang === l.code
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                  )}
                >
                  {l.code}
                </button>
              ))}`;

const replacementSidebar = `              {languages.map((l) => {
                let currentPath = pathname;
                if (currentPath.startsWith('/hi/') || currentPath === '/hi') {
                  currentPath = currentPath.replace(/^\\/hi/, '') || '/';
                } else if (currentPath.startsWith('/gu/') || currentPath === '/gu') {
                  currentPath = currentPath.replace(/^\\/gu/, '') || '/';
                }
                const localizedPath = l.code === 'en' ? currentPath : \`/\${l.code}\${currentPath === '/' ? '' : currentPath}\`;
                
                return (
                  <Link
                    key={l.code}
                    href={localizedPath}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all",
                      lang === l.code
                        ? "bg-orange-600 border-orange-600 text-white"
                        : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                    )}
                  >
                    {l.code}
                  </Link>
                );
              })}`;

sidebarContent = sidebarContent.replace(targetSidebar, replacementSidebar);
sidebarContent = sidebarContent.replace(targetSidebar.replace(/\n/g, '\r\n'), replacementSidebar);
fs.writeFileSync(sidebarPath, sidebarContent);
console.log('SidebarDrawer updated');
