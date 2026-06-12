
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Rating & Performance</h1>
          <p className="text-sm text-slate-500 mt-1">Understand your 4.8 / 5.0 score.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center text-sm">
            Action
          </button>
        </div>
      </div>
      
      
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Detailed Information</h3>
        <div className="grid grid-cols-2 gap-4">
          
            <div>
              <p className="text-sm font-medium text-slate-500">On-time Dispatch</p>
              <p className="mt-1 text-sm text-slate-900">98%</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Cancellation Rate</p>
              <p className="mt-1 text-sm text-slate-900">1%</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Return Rate</p>
              <p className="mt-1 text-sm text-slate-900">2%</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Customer Reviews</p>
              <p className="mt-1 text-sm text-slate-900">4.6 Avg</p>
            </div>
          
        </div>
      </div>
    
      
      
    </div>
  );
}
  