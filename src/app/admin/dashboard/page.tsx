'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  IndianRupee, TrendingUp, ShoppingBag, AlertCircle, 
  Clock, Package, Truck, CheckCircle2, AlertTriangle, Info
} from 'lucide-react';
import { 
  dashboardMetrics, salesData, recentOrders, operationalAlerts, sourcePerformance 
} from '@/lib/mock-data/dashboard';

export default function AdminDashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your marketplace and direct import operations.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
            <option>All Time</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors text-sm">
            Download Report
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total GMV" 
          value={formatCurrency(dashboardMetrics.totalGMV)} 
          trend="+12.5%" 
          isPositive={true}
          icon={<IndianRupee className="w-5 h-5 text-indigo-600" />}
          color="bg-indigo-50"
        />
        <MetricCard 
          title="Gross Margin" 
          value={`${dashboardMetrics.grossMargin}%`} 
          trend="+2.1%" 
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <MetricCard 
          title="Total Orders" 
          value={dashboardMetrics.orderCount.toLocaleString()} 
          trend="-1.2%" 
          isPositive={false}
          icon={<ShoppingBag className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
        />
        <MetricCard 
          title="Refund Liability" 
          value={formatCurrency(12500)} 
          trend="+5.4%" 
          isPositive={false}
          icon={<AlertCircle className="w-5 h-5 text-rose-600" />}
          color="bg-rose-50"
        />
      </div>

      {/* Operational Task Queues */}
      <h2 className="text-lg font-semibold text-slate-800 mb-4 tracking-tight">Task Queues</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <QueueCard title="Pending Vendors" value={dashboardMetrics.pendingVendorApprovals} icon={<Users />} />
        <QueueCard title="Pending Products" value={dashboardMetrics.pendingProductApprovals} icon={<Package />} />
        <QueueCard title="China Purchase" value={dashboardMetrics.chinaPurchaseQueue} isAlert={dashboardMetrics.chinaPurchaseQueue > 50} icon={<ShoppingCart />} />
        <QueueCard title="Delayed China" value={dashboardMetrics.delayedChinaOrders} isAlert={dashboardMetrics.delayedChinaOrders > 0} icon={<Clock />} />
        <QueueCard title="Hub Dispatch" value={dashboardMetrics.indiaHubPendingDispatch} icon={<Truck />} />
        <QueueCard title="Exceptions" value={dashboardMetrics.courierExceptions} isAlert={dashboardMetrics.courierExceptions > 0} icon={<AlertTriangle />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Sales Over Time (by Source)</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChina" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIndia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [formatCurrency(value), undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="china" name="China Feed" stroke="#4f46e5" fillOpacity={1} fill="url(#colorChina)" strokeWidth={2} />
                <Area type="monotone" dataKey="india" name="Indian Vendors" stroke="#10b981" fillOpacity={1} fill="url(#colorIndia)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Source Performance */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight mb-4">Operational Alerts</h2>
            <div className="space-y-4">
              {operationalAlerts.map(alert => (
                <div key={alert.id} className={`flex gap-3 p-3 rounded-lg text-sm ${
                  alert.type === 'error' ? 'bg-rose-50 text-rose-800' :
                  alert.type === 'warning' ? 'bg-amber-50 text-amber-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  <div className="mt-0.5">
                    {alert.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600" />}
                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {alert.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="leading-snug">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Recent Orders</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Source Mix</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-indigo-600">{order.id}</td>
                  <td className="px-6 py-4 text-slate-700">{order.customer}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.source === 'China Feed' ? 'bg-blue-100 text-blue-700' :
                      order.source === 'Indian Vendor' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {order.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        order.status.includes('Delivered') ? 'bg-emerald-500' :
                        order.status.includes('Stock') ? 'bg-amber-500' :
                        'bg-indigo-500'
                      }`}></div>
                      <span className="text-slate-700">{order.status}</span>
                    </div>
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

// Icons placeholders for the queues
const Users = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const ShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>

function MetricCard({ title, value, trend, isPositive, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function QueueCard({ title, value, isAlert, icon }: any) {
  return (
    <div className={`bg-white p-4 rounded-xl border ${isAlert ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100'} shadow-sm flex flex-col items-center text-center hover:border-indigo-200 transition-colors cursor-pointer`}>
      <div className={`mb-3 ${isAlert ? 'text-rose-500' : 'text-slate-400'}`}>
        {icon}
      </div>
      <p className={`text-2xl font-bold mb-1 ${isAlert ? 'text-rose-600' : 'text-slate-800'}`}>{value}</p>
      <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</h3>
    </div>
  );
}
