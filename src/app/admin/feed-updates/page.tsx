'use client';

import React from 'react';
import { feedUpdatesMock } from '@/lib/mock-data/admin-tables';
import { Search, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';

export default function FeedUpdatesPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">China Feed Updates</h1>
          <p className="text-sm text-slate-500 mt-1">Review sync changes for protected/manually overridden products.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Product Name..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Update ID</th>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Changed Field</th>
                <th className="px-6 py-4 font-medium text-center">Current (Website)</th>
                <th className="px-6 py-4 font-medium text-center">New (Feed)</th>
                <th className="px-6 py-4 font-medium">Protection</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feedUpdatesMock.map((update) => (
                <tr key={update.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{update.id}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{update.productName}</td>
                  <td className="px-6 py-4 text-slate-600">{update.field}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md font-mono text-xs">{update.currentValue}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md font-mono text-xs">{update.newValue}</span>
                  </td>
                  <td className="px-6 py-4">
                    {update.isProtected ? (
                       <span className="flex items-center text-amber-600 text-xs font-medium">
                         <ShieldAlert className="w-4 h-4 mr-1" /> Overwritten
                       </span>
                    ) : (
                       <span className="text-slate-400 text-xs">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Reject/Ignore">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
