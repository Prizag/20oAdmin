
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Category Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage department, categories, and attributes.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center text-sm">
            Action
          </button>
        </div>
      </div>
      
      
      
      
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"/>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg shadow-sm flex items-center transition-colors hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr><th className="px-6 py-4 font-medium">Category</th><th className="px-6 py-4 font-medium">Department</th><th className="px-6 py-4 font-medium">Attributes</th><th className="px-6 py-4 font-medium">Status</th><th className="px-6 py-4 font-medium">Compliance Warning</th><th className="px-6 py-4 font-medium">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"><td className="px-6 py-4">Electronics</td><td className="px-6 py-4">Home</td><td className="px-6 py-4">Voltage, Warranty</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Active</span></td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Warning</span></td><td className="px-6 py-4">Edit</td></tr><tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"><td className="px-6 py-4">Men Fashion</td><td className="px-6 py-4">Clothing</td><td className="px-6 py-4">Size, Color, Material</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Active</span></td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Clear</span></td><td className="px-6 py-4">Edit</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
  