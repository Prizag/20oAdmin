
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Wallet Ledgers</h1>
          <p className="text-sm text-slate-500 mt-1">Customer wallet balances and transactions.</p>
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
              <tr><th className="px-6 py-4 font-medium">Transaction ID</th><th className="px-6 py-4 font-medium">Customer</th><th className="px-6 py-4 font-medium">Type</th><th className="px-6 py-4 font-medium">Amount</th><th className="px-6 py-4 font-medium">Link</th><th className="px-6 py-4 font-medium">Date</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"><td className="px-6 py-4">WTX-101</td><td className="px-6 py-4">Rahul Sharma</td><td className="px-6 py-4">Credit (Refund)</td><td className="px-6 py-4">₹450</td><td className="px-6 py-4">REF-001</td><td className="px-6 py-4">12 Jun 2026</td></tr><tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"><td className="px-6 py-4">WTX-102</td><td className="px-6 py-4">Priya Singh</td><td className="px-6 py-4">Debit (Payment)</td><td className="px-6 py-4">₹-1299</td><td className="px-6 py-4">ORD-9002</td><td className="px-6 py-4">11 Jun 2026</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
  