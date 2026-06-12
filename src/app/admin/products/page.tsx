'use client';

import React from 'react';
import { adminProductsMock } from '@/lib/mock-data/admin-tables';
import { Search, Filter, Plus, AlertTriangle } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage catalog from all sources</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg shadow-sm flex items-center transition-colors hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by ID, name, or SKU..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Compliance</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {adminProductsMock.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{prod.title}</div>
                    <div className="text-xs text-slate-500">{prod.id} &bull; {prod.variants} variants</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      prod.source === 'China Product Feed' ? 'bg-blue-100 text-blue-700' :
                      prod.source === 'Indian Vendor' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {prod.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{prod.price}</td>
                  <td className="px-6 py-4 text-slate-700">{prod.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      prod.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {prod.compliance === 'Warning' ? (
                      <span className="flex items-center text-amber-600 font-medium text-xs">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                        Warning
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">Clear</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                      Edit
                    </button>
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
