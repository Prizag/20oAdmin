
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance & Accounting</h1>
          <p className="text-sm text-slate-500 mt-1">Invoices, GST, payouts, and CSV exports.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center text-sm">
            Action
          </button>
        </div>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Net Revenue</h3>
          <p className="text-2xl font-bold text-slate-900">₹9.8L</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Pending Payouts</h3>
          <p className="text-2xl font-bold text-slate-900">₹1.2L</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Wallet Liability</h3>
          <p className="text-2xl font-bold text-slate-900">₹45K</p>
        </div>
        
      </div>
    
      
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px px-4" aria-label="Tabs">
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">
                Invoice Dashboard
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                GST Reports
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Vendor Payouts
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                China Import Report
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                TCS/TDS
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Tally/Zoho Export
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Profitability
              </button>
            
          </nav>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Invoice Dashboard Content</h3>
          <p className="text-slate-600">This section allows you to manage invoice dashboard details. Mock content specifically generated for this tab context.</p>
        </div>
      </div>
    
      
    </div>
  );
}
  