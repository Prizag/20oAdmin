'use client';
import React, { useState } from 'react';
import { Upload, FileDown, CheckCircle, AlertTriangle, ArrowRight, Table, Server } from 'lucide-react';

export default function VendorCsvImportPage() {
  const [step, setStep] = useState(1);
  const [importSource, setImportSource] = useState('amazon');

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CSV Product Import</h1>
          <p className="text-sm text-slate-500 mt-1">Import your existing catalog from Amazon, Flipkart, Shopify, or generic CSV</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
          
          <div className={\`relative z-10 flex flex-col items-center \${step >= 1 ? 'text-indigo-600' : 'text-slate-400'}\`}>
            <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm \${step >= 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-500'}\`}>1</div>
            <span className="text-xs font-semibold mt-2 uppercase tracking-wide">Upload File</span>
          </div>
          <div className={\`relative z-10 flex flex-col items-center \${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}\`}>
            <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm \${step >= 2 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-slate-200 text-slate-400'}\`}>2</div>
            <span className="text-xs font-semibold mt-2 uppercase tracking-wide">Map Columns</span>
          </div>
          <div className={\`relative z-10 flex flex-col items-center \${step >= 3 ? 'text-indigo-600' : 'text-slate-400'}\`}>
            <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm \${step >= 3 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-slate-200 text-slate-400'}\`}>3</div>
            <span className="text-xs font-semibold mt-2 uppercase tracking-wide">Preview & Import</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Select Import Source</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {['amazon', 'flipkart', 'shopify', 'generic'].map(source => (
                <div 
                  key={source}
                  onClick={() => setImportSource(source)}
                  className={\`border-2 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 \${importSource === source ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}\`}
                >
                  <Server className={\`w-8 h-8 mb-3 \${importSource === source ? 'text-indigo-600' : 'text-slate-400'}\`} />
                  <span className={\`font-semibold capitalize \${importSource === source ? 'text-indigo-900' : 'text-slate-600'}\`}>{source}</span>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-lg font-medium text-slate-900">Drag & drop your CSV file here</p>
              <p className="text-sm text-slate-500 mt-1">or click to browse files from your computer</p>
              <p className="text-xs text-slate-400 mt-4 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 flex items-center">
                <FileDown className="w-3.5 h-3.5 mr-1.5" /> Download Template
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center">
                Continue to Mapping <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Map CSV Columns</h2>
              <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Source: {importSource.toUpperCase()}</span>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-8">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Legal Metrology Warning</p>
                <p>As an Indian vendor, you must map columns for <strong>Manufacturer Details, Country of Origin, and MRP</strong>. If these are missing from your CSV, you will need to add them manually after import before the products can be approved.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700">Required System Field</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">CSV Column Header</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Sample Data (Row 1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { req: 'Product Title', map: 'item_name', sample: 'Cotton Printed T-Shirt Mens' },
                    { req: 'SKU', map: 'seller_sku', sample: 'TSH-CTN-PRT-001' },
                    { req: 'Description', map: 'product_description', sample: '<p>High quality cotton t-shirt...</p>' },
                    { req: 'Selling Price', map: 'price', sample: '499.00' },
                    { req: 'MRP (Inclusive of Taxes)', map: 'mrp', sample: '999.00' },
                    { req: 'Stock Quantity', map: 'quantity', sample: '150' },
                    { req: 'Main Image URL', map: 'main_image_url', sample: 'https://images.example.com/tshirt1.jpg' },
                    { req: 'Country of Origin', map: 'origin', sample: 'India' },
                    { req: 'Manufacturer Details', map: 'manufacturer', sample: 'ABC Textiles, Tirupur, TN' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.req}</td>
                      <td className="px-6 py-4">
                        <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                          <option>{row.map}</option>
                          <option>unmapped</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{row.sample}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-6 rounded-lg transition-colors">
                Back
              </button>
              <button onClick={() => setStep(3)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center">
                Preview Import <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Validation & Import Preview</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl flex items-center">
                <Table className="w-10 h-10 text-slate-400 mr-4" />
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Rows</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">245</p>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl flex items-center">
                <CheckCircle className="w-10 h-10 text-emerald-500 mr-4" />
                <div>
                  <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Valid Products</p>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">231</p>
                </div>
              </div>
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-xl flex items-center">
                <AlertTriangle className="w-10 h-10 text-rose-500 mr-4" />
                <div>
                  <p className="text-sm font-semibold text-rose-700 uppercase tracking-wider">Errors/Missing Fields</p>
                  <p className="text-2xl font-bold text-rose-900 mt-1">14</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              Upon importing, external images will be asynchronously downloaded to our DigitalOcean Spaces and compressed. Products will be saved in <strong>"Pending Approval"</strong> status. Our admin team will review legal metrology fields before your products go live.
            </p>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-6 rounded-lg transition-colors">
                Back to Mapping
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> Confirm & Start Import
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}