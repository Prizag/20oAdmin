
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product: Wireless Earbuds TWS-200</h1>
          <p className="text-sm text-slate-500 mt-1">ID: PRD-C-001 | Source: China Product Feed</p>
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
              <p className="text-sm font-medium text-slate-500">Source Product ID</p>
              <p className="mt-1 text-sm text-slate-900">1688-9928374</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Status</p>
              <p className="mt-1 text-sm text-slate-900">Active</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Landed Cost</p>
              <p className="mt-1 text-sm text-slate-900">₹850</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Selling Price</p>
              <p className="mt-1 text-sm text-slate-900">₹1299</p>
            </div>
          
        </div>
      </div>
    
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px px-4" aria-label="Tabs">
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">
                Overview
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Variants
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Images
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Pricing
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Compliance
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Delivery
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Reviews
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Feed/Override History
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Audit History
              </button>
            
          </nav>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Overview Content</h3>
          <p className="text-slate-600">This section allows you to manage overview details. Mock content specifically generated for this tab context.</p>
        </div>
      </div>
    
      
    </div>
  );
}
  