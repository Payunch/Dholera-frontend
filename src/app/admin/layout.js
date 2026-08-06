"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // If we are on the admin login page, don't show the sidebar/navbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Leads', path: '/admin/leads', icon: '👥' },
    { name: 'Updates', path: '/admin/blogs', icon: '📝' },
    { name: 'Insights', path: '/admin/insights', icon: '📈' },
    { name: 'Database', path: '/admin/database', icon: '🗄️' },
    { name: 'Master Table', path: '/admin/master-table', icon: '📋' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' }
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar (Menubar) */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-950">
          {sidebarOpen && <span className="font-black text-xl tracking-widest text-blue-400">RITE MNG</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded hover:bg-slate-800 transition-colors">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={item.path} href={item.path}>
                <div className={`px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors flex items-center ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="ml-4 font-medium uppercase tracking-wider text-sm">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <Link href="/admin/login">
            <div className="px-4 py-3 rounded-lg cursor-pointer transition-colors flex items-center text-red-400 hover:bg-slate-800">
              <span className="text-xl">🚪</span>
              {sidebarOpen && <span className="ml-4 font-medium uppercase tracking-wider text-sm">Logout</span>}
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-500 uppercase">Welcome, Admin</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
