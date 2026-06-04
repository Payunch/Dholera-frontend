const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/about-us/page.tsx', 'utf8');

// Replace Contact Form with button
content = content.replace(/\{contactStatus === 'success'[\s\S]*?<\/form>\n\s*\)}/s, `
            <div className="text-center py-12">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest leading-loose mb-10 max-w-sm mx-auto">
                Our team is ready to answer your questions and guide you through the investment process.
              </p>
              <button 
                onClick={() => window.dispatchEvent(new Event('openUniversalConnect'))}
                className="w-full h-16 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl active:scale-95 flex items-center justify-center"
              >
                Initialize Connection
              </button>
            </div>
`);

// Replace Site Visit Form with button
content = content.replace(/\{visitStatus === 'success'[\s\S]*?<\/form>\n\s*\)}/s, `
                <div className="text-center py-12">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest leading-loose mb-10 max-w-sm mx-auto">
                    Bypass the middlemen. Secure your high-priority connection today.
                  </p>
                  <button 
                    onClick={() => window.dispatchEvent(new Event('openUniversalConnect'))}
                    className="w-full h-16 rounded-2xl bg-[#FF7A00] text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95 flex items-center justify-center"
                  >
                    Establish Connection
                  </button>
                </div>
`);

// Remove unused state variables
content = content.replace(/const \[contactForm, setContactForm\].*?\n/g, '');
content = content.replace(/const \[contactStatus, setContactStatus\].*?\n/g, '');
content = content.replace(/const \[visitForm, setVisitForm\].*?\n/g, '');
content = content.replace(/const \[visitStatus, setVisitStatus\].*?\n/g, '');
content = content.replace(/const tomorrow = new Date.*?\n/g, '');
content = content.replace(/const today = new Date.*?\n/g, '');
content = content.replace(/const nextWeek = new Date.*?\n/g, '');
content = content.replace(/const handlePhoneChange = [\s\S]*?\};\n\n/s, '');
content = content.replace(/const handleContactSubmit = [\s\S]*?\};\n\n/s, '');
content = content.replace(/const handleVisitSubmit = [\s\S]*?\};\n\n/s, '');

fs.writeFileSync('src/app/(public)/about-us/page.tsx', content, 'utf8');
