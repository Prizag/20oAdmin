
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">China Operations Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Admin view of China team tasks and margins.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center text-sm">
            Action
          </button>
        </div>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Tasks Pending</h3>
          <p className="text-2xl font-bold text-slate-900">89</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Delayed</h3>
          <p className="text-2xl font-bold text-slate-900">5</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Margin Loss Alerts</h3>
          <p className="text-2xl font-bold text-slate-900">2</p>
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
              <tr><th className="px-6 py-4 font-medium">Task ID</th><th className="px-6 py-4 font-medium">Product</th><th className="px-6 py-4 font-medium">Budget</th><th className="px-6 py-4 font-medium">Actual Cost</th><th className="px-6 py-4 font-medium">Status</th><th className="px-6 py-4 font-medium">SLA</th><th className="px-6 py-4 font-medium">Escalation</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"><td className="px-6 py-4">TSK-101</td><td className="px-6 py-4">Earbuds</td><td className="px-6 py-4">¥45.00</td><td className="px-6 py-4">-</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Pending</span></td><td className="px-6 py-4">On Time</td><td className="px-6 py-4">-</td></tr><tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"><td className="px-6 py-4">TSK-102</td><td className="px-6 py-4">Clock</td><td className="px-6 py-4">¥120.00</td><td className="px-6 py-4">¥130.00</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">Purchased</span></td><td className="px-6 py-4">Breached</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">Margin Alert</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
  