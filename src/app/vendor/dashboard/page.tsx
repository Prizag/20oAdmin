'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { 
  IndianRupee, Package, ShoppingCart, Clock, Star, AlertTriangle, Info, Truck
} from 'lucide-react';
import { 
  vendorDashboardMetrics, vendorSalesData, vendorRecentOrders, vendorAlerts 
} from '@/lib/mock-data/vendor-dashboard';

export default function VendorDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vendor Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your catalog, orders, and fulfillment.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center shadow-sm">
             <Star className="w-4 h-4 text-amber-500 mr-2 fill-amber-500" />
             <span className="text-sm font-semibold text-slate-800">Rating: {vendorDashboardMetrics.rating} / 5.0</span>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors text-sm">
            + Add Product
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="This Month Sales" 
          value={formatCurrency(vendorDashboardMetrics.thisMonthSales)} 
          icon={<IndianRupee className="w-5 h-5 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <MetricCard 
          title="Active Products" 
          value={vendorDashboardMetrics.activeProducts} 
          icon={<Package className="w-5 h-5 text-indigo-600" />}
          color="bg-indigo-50"
        />
        <MetricCard 
          title="Orders to Prepare" 
          value={vendorDashboardMetrics.ordersToPrepare} 
          icon={<ShoppingCart className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
          alert={vendorDashboardMetrics.ordersToPrepare > 0}
        />
        <MetricCard 
          title="Subscription Days" 
          value={vendorDashboardMetrics.subscriptionDaysLeft} 
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Sales This Month</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [formatCurrency(value), 'Sales']}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items & Alerts */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight mb-4">To-Do List</h2>
            <div className="space-y-3">
              <ActionItem title="Accept New Orders" count={vendorDashboardMetrics.ordersToPrepare} icon={<ShoppingCart />} color="text-amber-600" bg="bg-amber-50" />
              <ActionItem title="Ready for Pickup" count={vendorDashboardMetrics.pickupPending} icon={<Truck />} color="text-blue-600" bg="bg-blue-50" />
              <ActionItem title="Low Stock Alerts" count={vendorDashboardMetrics.stockAlerts} icon={<AlertTriangle />} color="text-rose-600" bg="bg-rose-50" />
              <ActionItem title="Pending Approvals" count={vendorDashboardMetrics.pendingApprovals} icon={<Clock />} color="text-slate-600" bg="bg-slate-50" />
            </div>
            
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight mt-8 mb-4">Alerts</h2>
            <div className="space-y-3">
              {vendorAlerts.map(alert => (
                <div key={alert.id} className={`flex gap-3 p-3 rounded-lg text-sm ${
                  alert.type === 'error' ? 'bg-rose-50 text-rose-800' :
                  alert.type === 'warning' ? 'bg-amber-50 text-amber-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  <div className="mt-0.5">
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

      {/* Orders to Process Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Active Orders</h2>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Qty</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">SLA / Timer</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendorRecentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-700">{order.product}</td>
                  <td className="px-6 py-4 text-slate-700">{order.qty}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.status === 'New' ? 'bg-amber-100 text-amber-700' :
                      order.status === 'Ready for Pickup' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Picked Up' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${order.sla.includes('left') ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
                      {order.sla}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'New' && (
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                        Accept Order
                      </button>
                    )}
                    {order.status === 'Ready for Pickup' && (
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Print Slip
                      </button>
                    )}
                    {order.status !== 'New' && order.status !== 'Ready for Pickup' && (
                      <span className="text-slate-400">-</span>
                    )}
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

function MetricCard({ title, value, icon, color, alert }: any) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border ${alert ? 'border-amber-200' : 'border-slate-100'} flex flex-col hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function ActionItem({ title, count, icon, color, bg }: any) {
  return (
    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
          {React.cloneElement(icon, { className: 'w-4 h-4' })}
        </div>
        <span className="text-sm font-medium text-slate-700">{title}</span>
      </div>
      <span className={`text-sm font-bold ${count > 0 ? color : 'text-slate-400'}`}>
        {count}
      </span>
    </div>
  );
}
