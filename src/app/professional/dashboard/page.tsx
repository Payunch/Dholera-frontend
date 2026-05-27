import React from 'react';

export default function ProfessionalDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Professional Portal</h1>
            <p className="mt-2 text-slate-300">Manage your Dholera SIR professional profile and documentation.</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">My Profile</h3>
                <p className="text-slate-600">Update your professional credentials and contact information.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">Clearance Requests</h3>
                <p className="text-slate-600">Track and manage your submitted clearance certificate requests.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">Documents</h3>
                <p className="text-slate-600">Access your purchased official documents and guides.</p>
              </div>
            </div>
            
            <div className="mt-12 bg-orange-50 border border-orange-100 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Dashboard Coming Soon</h2>
              <p className="text-slate-600 mb-6">We are currently upgrading the professional dashboard experience. Your data is safe.</p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
