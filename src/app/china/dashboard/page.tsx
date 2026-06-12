'use client';

import React from 'react';
import { 
  ClipboardList, Search, ShoppingBag, CheckSquare, Package, AlertOctagon, Box
} from 'lucide-react';
import { 
  chinaDashboardMetrics, chinaTaskQueue, chinaCartons
} from '@/lib/mock-data/china-dashboard';

export default function ChinaTeamDashboard() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">China Operations Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Sourcing, QC, and international dispatch.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors text-sm flex items-center">
            <Search className="w-4 h-4 mr-2" /> Scan Barcode
          </button>
        </div>
      </div>

      {/* Task Queue Metrics */}
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Task Queue</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <QueueCard title="Total Pending" value={chinaDashboardMetrics.tasksPending} icon={<ClipboardList />} />
        <QueueCard title="Availability Check" value={chinaDashboardMetrics.availabilityChecksPending} icon={<Search />} color="text-amber-500" />
        <QueueCard title="To Purchase" value={chinaDashboardMetrics.purchasesPending} icon={<ShoppingBag />} color="text-blue-500" />
        <QueueCard title="QC Pending" value={chinaDashboardMetrics.qcPending} icon={<CheckSquare />} color="text-indigo-500" />
        <QueueCard title="Cartons to Ship" value={chinaDashboardMetrics.cartonsToShip} icon={<Package />} color="text-emerald-500" />
        <QueueCard title="Issues / Escalated" value={chinaDashboardMetrics.issuesRaised} isAlert={chinaDashboardMetrics.issuesRaised > 0} icon={<AlertOctagon />} color="text-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Main Task List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Priority Tasks</h2>
            <div className="flex gap-2">
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium cursor-pointer hover:bg-slate-200">All</span>
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded font-medium cursor-pointer hover:bg-amber-200">High Priority</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Task ID</th>
                  <th className="px-6 py-4 font-medium">Product Name</th>
                  <th className="px-6 py-4 font-medium">Qty</th>
                  <th className="px-6 py-4 font-medium">Budget</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Due</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chinaTaskQueue.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{task.id}</td>
                    <td className="px-6 py-4 text-slate-700 max-w-xs truncate" title={task.product}>{task.product}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{task.qty}</td>
                    <td className="px-6 py-4 text-slate-600">{task.budget}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Availability Check' ? 'bg-amber-100 text-amber-700' :
                        task.status === 'Purchase Pending' ? 'bg-blue-100 text-blue-700' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${task.priority === 'High' ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
                        {task.due}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Cartons */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight mb-4 flex items-center">
              <Box className="w-5 h-5 mr-2 text-slate-500" />
              Active Cartons
            </h2>
            <div className="space-y-4">
              {chinaCartons.map(carton => (
                <div key={carton.id} className="border border-slate-100 p-4 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-800 text-sm">{carton.id}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${carton.status === 'Ready to Ship' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {carton.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mb-3">
                    <span>{carton.itemsCount} Items</span>
                    <span>{carton.weight}</span>
                  </div>
                  <div className="text-xs text-slate-400 border-t border-slate-50 pt-2 flex justify-between">
                    <span>Dest: {carton.dest}</span>
                    <span>{carton.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors">
              + Create New Carton
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

function QueueCard({ title, value, isAlert, icon, color = "text-slate-600" }: any) {
  return (
    <div className={`bg-white p-4 rounded-xl border ${isAlert ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100'} shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer`}>
      <div className={`mb-3 ${isAlert ? 'text-rose-500' : color}`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <p className={`text-2xl font-bold mb-1 ${isAlert ? 'text-rose-600' : 'text-slate-800'}`}>{value}</p>
      <h3 className="text-slate-500 text-xs font-medium tracking-wide uppercase">{title}</h3>
    </div>
  );
}
