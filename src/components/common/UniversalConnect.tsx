"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, CheckCircle2, AlertCircle } from "lucide-react";
import { apiClient } from "@/lib/api";

export function UniversalConnect() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [isOpen, setIsOpen] = useState(false);
  const [visitForm, setVisitForm] = useState({ name: "", phone: "", date: tomorrow });
  const [visitStatus, setVisitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Listen for custom events to open the modal from anywhere
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openUniversalConnect', handleOpen);
    return () => window.removeEventListener('openUniversalConnect', handleOpen);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setVisitForm({ ...visitForm, phone: val });
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.name || visitForm.phone.length !== 10) return;
    
    const selectedDate = new Date(visitForm.date);
    const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    if (selectedDate > maxDate) {
       setVisitStatus("error");
       return;
    }

    setVisitStatus("loading");
    
    try {
      await apiClient.post("/leads", { 
        ...visitForm, 
        source: "Universal Priority Connection Widget",
        notes: `Requested site visit for: ${visitForm.date}`
      });
      setVisitStatus("success");
      setVisitForm({ name: "", phone: "", date: tomorrow });
    } catch (err) {
      setVisitStatus("error");
    }
  };

  return (
    <>
      {/* The Floating 'Dot' */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[140] h-16 w-16 rounded-full bg-[#FF7A00] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:shadow-orange-600/50 hidden md:flex animate-pulse"
        aria-label="Talk to Owner"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Mobile Sticky Button Alternative */}
      <div className="fixed bottom-14 left-0 right-0 z-[140] flex md:hidden p-4 pointer-events-none justify-end">
        <button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#FF7A00] text-white flex items-center justify-center shadow-2xl pointer-events-auto hover:scale-110 transition-transform animate-pulse"
          aria-label="Talk to Owner"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>

      {/* The Universal Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#0B132B]/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => { if (visitStatus !== 'loading') setIsOpen(false); }}
        >
          <div 
            className="bg-[#0B132B] rounded-[3rem] p-8 sm:p-12 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] w-full max-w-lg relative animate-in zoom-in-95 duration-500 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors z-20"
            >
              <X className="h-6 w-6" />
            </button>

            {visitStatus === 'error' && (
              <div className="mb-8 flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-bold text-red-400 uppercase tracking-widest leading-relaxed">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>Transmission Link Failed</span>
                </div>
                <p className="text-[9px] text-red-500/80 pl-8">
                  {new Date(visitForm.date) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
                    ? "Date must be within 7 days of today." 
                    : "Please verify your connection and try again."}
                </p>
              </div>
            )}

            {visitStatus === 'success' ? (
              <div className="text-center py-12 space-y-8">
                <div className="h-24 w-24 bg-green-500/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#10B981]/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="h-12 w-12 animate-in zoom-in-50 duration-700" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Transmission <span className="text-[#FF7A00]">Success</span></h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-[280px] mx-auto">
                  Our Dholera strategist will contact you via secure line within 15 minutes.
                </p>
                <button 
                  onClick={() => { setIsOpen(false); setVisitStatus('idle'); }}
                  className="mt-8 px-12 py-5 bg-[#FF7A00] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-600/20"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12 relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00] mb-6">
                    Talk to Owner
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">Priority <span className="text-[#FF7A00] italic">Connection</span></h3>
                </div>

                <form className="space-y-5 relative z-10" onSubmit={handleVisitSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Identity</label>
                    <input 
                      type="text" 
                      placeholder="ENTER NAME" 
                      required 
                      value={visitForm.name}
                      onChange={(e) => setVisitForm({...visitForm, name: e.target.value})}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-bold uppercase tracking-widest placeholder-slate-700 text-white outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Verified Mobile</label>
                    <input 
                      type="tel" 
                      placeholder="10-DIGIT MOBILE" 
                      required 
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={visitForm.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-bold uppercase tracking-widest placeholder-slate-700 text-white outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex justify-between">
                      <span>Deployment Date</span>
                      <span className="text-orange-500/50">*Within 7 days</span>
                    </label>
                    <input 
                      type="date" 
                      required 
                      min={today}
                      max={nextWeek}
                      value={visitForm.date}
                      onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-bold uppercase tracking-widest placeholder-slate-700 text-white outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={visitStatus === 'loading' || visitForm.phone.length !== 10}
                    className="w-full h-16 mt-8 rounded-2xl bg-[#FF7A00] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 disabled:bg-slate-900 disabled:text-slate-700 transition-all shadow-[0_0_50px_rgba(255,122,0,0.3)] flex items-center justify-center active:scale-95"
                  >
                    {visitStatus === 'loading' ? (
                      <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Establish Connection"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
