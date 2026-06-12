'use client';

import React from 'react';
import { 
  ScanLine, PackageOpen, LayoutGrid, Printer, Truck, AlertTriangle, ArrowRight
} from 'lucide-react';
import { 
  hubDashboardMetrics, hubInboundCartons, hubLocalDispatch, hubExceptions
} from '@/lib/mock-data/hub-dashboard';

export default function HubDashboard() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Transit Hub Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Receive, Sort, and Dispatch operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition-colors text-sm flex items-center">
            <ScanLine className="w-4 h-4 mr-2" /> Scan Carton / Package
          </button>
        </div>
      </div>

      {/* Hub Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <MetricBox title="Expected Cartons" value={hubDashboardMetrics.inboundCartonsExpected} icon={<Truck />} color="text-blue-500" />
        <MetricBox title="Received Today" value={hubDashboardMetrics.cartonsReceivedToday} icon={<PackageOpen />} color="text-indigo-500" />
        <MetricBox title="To Split/Sort" value={hubDashboardMetrics.packagesToSplit} icon={<LayoutGrid />} color="text-amber-500" />
        <MetricBox title="Labels to Print" value={hubDashboardMetrics.localLabelsToPrint} icon={<Printer />} color="text-emerald-500" />
        <MetricBox title="Handed Over" value={hubDashboardMetrics.handedOverToday} icon={<ArrowRight />} color="text-slate-600" />
        <MetricBox title="SLA Breached" value={hubDashboardMetrics.slaBreached} isAlert={hubDashboardMetrics.slaBreached > 0} icon={<AlertTriangle />} color="text-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Local Dispatch Queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Local Dispatch Queue</h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Destination</th>
                  <th className="px-6 py-4 font-medium">Courier</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">SLA</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hubLocalDispatch.map((pkg) => (
                  <tr key={pkg.orderId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{pkg.orderId}</td>
                    <td className="px-6 py-4 text-slate-700 max-w-xs truncate">{pkg.destination}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{pkg.courier}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        pkg.status === 'Label Printed' ? 'bg-emerald-100 text-emerald-700' :
                        pkg.status === 'Packing' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-500 text-sm">
                        {pkg.due}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inbound & Exceptions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight mb-4">Inbound Cartons</h2>
            <div className="space-y-4">
              {hubInboundCartons.map(carton => (
                <div key={carton.id} className="border border-slate-100 p-4 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-800 text-sm">{carton.id}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${carton.status.includes('Received') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {carton.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mb-3">
                    <span>{carton.expectedItems} Items Expected</span>
                  </div>
                  <div className="text-xs text-slate-400 border-t border-slate-50 pt-2 flex justify-between">
                    <span>ETA: {carton.eta}</span>
                    <button className="text-indigo-600 font-medium">Scan & Receive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight mb-4 flex items-center text-rose-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Active Exceptions
            </h2>
            <div className="space-y-3">
              {hubExceptions.map((ex, i) => (
                <div key={i} className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-rose-800 text-sm">{ex.type}</span>
                    <span className="text-xs text-rose-600 font-medium">{ex.ref}</span>
                  </div>
                  <p className="text-xs text-rose-700 leading-snug">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricBox({ title, value, isAlert, icon, color = "text-slate-600" }: any) {
  return (
    <div className={`bg-white p-4 rounded-xl border ${isAlert ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100'} shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow`}>
      <div className={`mb-2 ${isAlert ? 'text-rose-500' : color}`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <p className={`text-2xl font-bold mb-1 ${isAlert ? 'text-rose-600' : 'text-slate-800'}`}>{value}</p>
      <h3 className="text-slate-500 text-[11px] font-semibold tracking-wide uppercase">{title}</h3>
    </div>
  );
}
