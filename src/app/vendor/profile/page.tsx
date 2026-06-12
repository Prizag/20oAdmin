
'use client';
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';


export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vendor Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your public and internal information.</p>
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
              <p className="text-sm font-medium text-slate-500">Business Name</p>
              <p className="mt-1 text-sm text-slate-900">Surya Fashions Pvt Ltd</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Contact</p>
              <p className="mt-1 text-sm text-slate-900">+91-9876543210</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">GSTIN</p>
              <p className="mt-1 text-sm text-slate-900">07AAAAA0000A1Z5</p>
            </div>
          
            <div>
              <p className="text-sm font-medium text-slate-500">Status</p>
              <p className="mt-1 text-sm text-slate-900">Active</p>
            </div>
          
        </div>
      </div>
    
      
      
    </div>
  );
}
  