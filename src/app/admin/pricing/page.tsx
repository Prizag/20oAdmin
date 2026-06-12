'use client';
import React, { useState } from 'react';
import { Save, AlertTriangle, Calculator, RefreshCw, Settings, Info } from 'lucide-react';

export default function PricingEnginePage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pricing Engine</h1>
          <p className="text-sm text-slate-500 mt-1">Configure global and category-wise landed cost formulas</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition-colors flex items-center">
          <Save className="w-4 h-4 mr-2" /> Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center">
              <Calculator className="w-5 h-5 text-indigo-600 mr-3" />
              <h2 className="text-lg font-bold text-slate-800">Global Formula Base</h2>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 font-mono text-sm text-slate-700 leading-relaxed">
                <strong>Final Selling Price =</strong> <br/>
                (((China Cost + Local Shipping + Handling + Intl Freight + Customs + Tax + Return Reserve) × <span className="text-indigo-600 font-bold">Exchange Rate</span>) + Gateway Fee + Platform Margin)
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Handling / Repacking Fee 
                    <span className="text-xs text-slate-400">¥ (RMB)</span>
                  </label>
                  <input type="number" defaultValue={5} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  <p className="text-xs text-slate-500 mt-1">Consolidation and QC fee per item</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Customs / Duty Buffer
                    <span className="text-xs text-slate-400">%</span>
                  </label>
                  <input type="number" defaultValue={28} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  <p className="text-xs text-slate-500 mt-1">Applied to landed cost</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    GST / Tax Buffer
                    <span className="text-xs text-slate-400">%</span>
                  </label>
                  <input type="number" defaultValue={18} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Return / Refund Reserve
                    <span className="text-xs text-slate-400">%</span>
                  </label>
                  <input type="number" defaultValue={5} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  <p className="text-xs text-slate-500 mt-1">Buffer for wrong/damaged refunds</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Payment Gateway Fee
                    <span className="text-xs text-slate-400">%</span>
                  </label>
                  <input type="number" defaultValue={2.5} step="0.1" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Platform Margin Target
                    <span className="text-xs text-slate-400">%</span>
                  </label>
                  <input type="number" defaultValue={20} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  <p className="text-xs text-slate-500 mt-1">Minimum target net margin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div className="flex items-center">
                <Settings className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-lg font-bold text-slate-800">Operational Guardrails</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-8">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rounding Rule</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none">
                    <option>Round to nearest 9 (e.g. 199)</option>
                    <option>Round to nearest 49/99</option>
                    <option>Round to whole number</option>
                    <option>No rounding</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Minimum Margin Guard <span className="text-xs text-amber-600 font-bold">BLOCK BLOCKER</span>
                  </label>
                  <div className="flex items-center">
                    <input type="number" defaultValue={5} className="w-24 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none mr-2" />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">System blocks any sale (via coupon/override) if net margin drops below this.</p>
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
            <h3 className="font-bold text-lg mb-2 flex items-center z-10 relative">
              <RefreshCw className="w-5 h-5 mr-2" /> Live Exchange Rate
            </h3>
            <div className="text-4xl font-bold mb-1 z-10 relative">₹ 11.82</div>
            <div className="text-indigo-200 text-xs mb-4 z-10 relative">1 CNY = INR (3-Day Average)</div>
            <div className="bg-indigo-950/50 rounded-lg p-3 text-xs text-indigo-100 z-10 relative flex justify-between items-center border border-indigo-500/30">
              <span>Source: Fixer.io API</span>
              <span className="font-semibold text-emerald-400">Synced 2h ago</span>
            </div>
            <button className="w-full mt-4 bg-white text-indigo-900 font-semibold text-sm py-2 rounded-lg hover:bg-indigo-50 transition-colors z-10 relative">
              Manual Override
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Category Overrides</h3>
            <div className="space-y-4">
              {[
                { cat: 'Electronics', margin: '25%', buffer: '35%' },
                { cat: 'Fashion', margin: '30%', buffer: '28%' },
                { cat: 'Footwear', margin: '15%', buffer: '28%' },
              ].map(c => (
                <div key={c.cat} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{c.cat}</span>
                  <div className="flex gap-2">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Margin: {c.margin}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Duty: {c.buffer}</span>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 py-1.5 border border-dashed border-indigo-200 rounded-lg bg-indigo-50/50">
                + Add Category Override
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}