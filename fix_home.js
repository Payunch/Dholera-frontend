const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// Replace the old inline form logic with the Universal Connect trigger
content = content.replace(/\{visitStatus === 'error'[\s\S]*?<\/form>\n\s*<\/>\n\s*\)}/s, `
                <div className="text-center py-12">
                  <h3 className="text-xl font-black text-white uppercase mb-6">Talk Directly to the Founder</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest leading-loose mb-10 max-w-sm mx-auto">
                    Bypass the middlemen. Secure your high-priority connection today.
                  </p>
                  <button 
                    onClick={() => window.dispatchEvent(new Event('openUniversalConnect'))}
                    className="w-full h-16 rounded-2xl bg-[#FF7A00] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-[0_0_50px_rgba(255,122,0,0.3)] flex items-center justify-center active:scale-95"
                  >
                    Establish Connection
                  </button>
                </div>
`);

// Remove the old Modal (lines starting from {/* SITE VISIT MODAL */} up to {/* 1.2 TRUST BANNER */})
content = content.replace(/\{\/\* SITE VISIT MODAL \*\/\}.*?(?=\{\/\* 1\.2 TRUST BANNER \*\/\})/s, '');

// Clean up unused state variables from HomeClient
content = content.replace(/const \[visitForm, setVisitForm\].*?\n/g, '');
content = content.replace(/const \[visitStatus, setVisitFormStatus\].*?\n/g, '');
content = content.replace(/const \[isModalOpen, setIsModalOpen\].*?\n/g, '');
content = content.replace(/const tomorrow = new Date.*?\n/g, '');
content = content.replace(/const today = new Date.*?\n/g, '');
content = content.replace(/const nextWeek = new Date.*?\n/g, '');
content = content.replace(/const handlePhoneChange = [\s\S]*?\};\n\n/s, '');
content = content.replace(/const handleVisitSubmit = [\s\S]*?\};\n\n/s, '');

fs.writeFileSync('src/app/HomeClient.tsx', content, 'utf8');
