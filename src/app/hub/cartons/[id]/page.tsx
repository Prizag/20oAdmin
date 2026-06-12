
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Carton Detail: CRT-001</h1>
          <p className="text-sm text-slate-500 mt-1">Status: QC Pending</p>
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
              <p className="text-sm font-medium text-slate-500">From</p>
              <p className="mt-1 text-sm text-slate-900">China Consolidation</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Expected Items</p>
              <p className="mt-1 text-sm text-slate-900">45</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Weight</p>
              <p className="mt-1 text-sm text-slate-900">12.5 kg</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Tracking</p>
              <p className="mt-1 text-sm text-slate-900">FDX-123456</p>
            </div>
          
        </div>
      </div>
    
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px px-4" aria-label="Tabs">
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">
                Contents to QC
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Photos
              </button>
            
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Discrepancies
              </button>
            
          </nav>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Contents to QC Content</h3>
          <p className="text-slate-600">This section allows you to manage contents to qc details. Mock content specifically generated for this tab context.</p>
        </div>
      </div>
    
      
    </div>
  );
}
  