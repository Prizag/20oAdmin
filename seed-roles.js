const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/lib/mock-data/admin-tables.ts');

const newMockData = `
export const rolesMock = [
  { id: 'R1', name: 'Super Admin', type: 'Internal Admin', scope: 'Full system access', priority: 'Must Have', users: 2, sensitiveAccess: 'Yes', status: 'Active', updated: '2026-06-11' },
  { id: 'R2', name: 'Admin Manager', type: 'Internal Admin', scope: 'General access except role creation and high-value approvals', priority: 'Must Have', users: 3, sensitiveAccess: 'Limited', status: 'Active', updated: '2026-06-11' },
  { id: 'R3', name: 'Product Manager', type: 'Internal Admin', scope: 'Categories, products, feed overrides, pricing, compliance', priority: 'Must Have', users: 4, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-10' },
  { id: 'R4', name: 'Order Manager', type: 'Internal Admin', scope: 'Orders, split orders, China status, logistics, returns', priority: 'Must Have', users: 5, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-10' },
  { id: 'R5', name: 'China Operations User', type: 'Internal Admin', scope: 'Purchase queue, QC, bundling, shipping. No customer PII.', priority: 'Must Have', users: 8, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-09' },
  { id: 'R6', name: 'Transit Warehouse / Hub User', type: 'Internal Admin', scope: 'Inbound cartons, QC, sorting, packing, local labels.', priority: 'Must Have', users: 12, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-09' },
  { id: 'R7', name: 'Vendor Manager', type: 'Internal Admin', scope: 'Vendor onboarding, KYC, approval, subscription, rating.', priority: 'Must Have', users: 4, sensitiveAccess: 'Limited', status: 'Active', updated: '2026-06-10' },
  { id: 'R8', name: 'Finance Manager', type: 'Internal Admin', scope: 'Invoices, GST, vendor settlements, wallet, TCS/TDS, exports.', priority: 'Must Have', users: 2, sensitiveAccess: 'Yes', status: 'Active', updated: '2026-06-11' },
  { id: 'R9', name: 'Customer Support Agent', type: 'Internal Admin', scope: 'Orders, tickets, complaints, refund requests.', priority: 'Must Have', users: 15, sensitiveAccess: 'Limited', status: 'Active', updated: '2026-06-08' },
  { id: 'R10', name: 'Marketing / CMS Manager', type: 'Internal Admin', scope: 'Banners, collections, coupons, campaigns, SEO.', priority: 'Good to Have', users: 2, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-05' },
  { id: 'R11', name: 'Compliance Officer', type: 'Internal Admin', scope: 'Warnings, restricted categories, product risk review.', priority: 'Good to Have', users: 1, sensitiveAccess: 'Limited', status: 'Active', updated: '2026-06-07' },
  { id: 'R12', name: 'Read-only Auditor', type: 'Internal Admin', scope: 'Audit logs, security logs, export logs. No edit.', priority: 'Good to Have', users: 2, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-02' },
  { id: 'R13', name: 'Indian Vendor', type: 'External Vendor', scope: 'Manage own profile, catalog, stock, orders, CSV imports.', priority: 'Must Have', users: 150, sensitiveAccess: 'No', status: 'Active', updated: '2026-06-12' },
];

export const permissionModulesMock = [
  'Dashboard', 'Admin Users', 'Roles & Permissions', 'Product Management', 'China Product Feed', 
  'China Feed Update Review', 'Indian Vendor Product Approval', 'Categories & Attributes', 
  'Pricing Engine', 'Exchange Rates', 'Orders', 'Split Orders / Fulfillment Groups', 
  'China Operations', 'Transit Warehouse / Hub', 'Indian Vendors', 'Vendor KYC', 
  'Vendor Subscription', 'Vendor Ratings', 'Logistics', 'Returns', 'Refunds', 'Wallet', 
  'Support Tickets', 'Reviews & Ratings', 'Marketing / CMS', 'Coupons', 'Reports & Analytics', 
  'Finance', 'GST Reports', 'Vendor Settlements', 'Tally / Zoho CSV Export', 
  'KYC Document Access', 'Compliance Warnings', 'Legal Metrology Fields', 'Audit Logs', 
  'Security Logs', 'Settings'
];
`;

let currentContent = fs.readFileSync(mockDataPath, 'utf8');
if(!currentContent.includes('rolesMock')) {
  fs.writeFileSync(mockDataPath, currentContent + '\\n' + newMockData);
  console.log('Appended mock data');
}

const rolesPagePath = path.join(__dirname, 'src/app/admin/roles/page.tsx');
const rolesPageContent = \`'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, CheckCircle, XCircle, ShieldAlert, Users, Layers, Activity } from 'lucide-react';
import { rolesMock, permissionModulesMock } from '@/lib/mock-data/admin-tables';

export default function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roles & Permissions</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system roles, module access, and sensitive permissions</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center text-sm">
            <Plus className="w-4 h-4 mr-2" /> Create Role
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search roles..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"/>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg shadow-sm flex items-center transition-colors hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Role Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Scope Summary</th>
                <th className="px-6 py-4 font-medium">Users</th>
                <th className="px-6 py-4 font-medium">Sensitive Access</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rolesMock.map(role => (
                <tr key={role.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{role.name}</td>
                  <td className="px-6 py-4">
                    <span className={\\\`px-2.5 py-1 rounded-full text-xs font-medium \\\${role.type === 'Internal Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}\\\`}>
                      {role.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs max-w-xs truncate" title={role.scope}>{role.scope}</td>
                  <td className="px-6 py-4">{role.users}</td>
                  <td className="px-6 py-4">
                    <span className={\\\`px-2.5 py-1 rounded-full text-xs font-medium \\\${role.sensitiveAccess === 'Yes' ? 'bg-rose-100 text-rose-700' : role.sensitiveAccess === 'Limited' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}\\\`}>
                      {role.sensitiveAccess}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={\\\`px-2.5 py-1 rounded-full text-xs font-medium \\\${role.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}\\\`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{role.priority}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedRole(role)}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-xs mr-3"
                    >
                      View/Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRole && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedRole.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedRole.type} • {selectedRole.users} Users Assigned</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Save Changes</button>
                <button onClick={() => setSelectedRole(null)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Close</button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role Description</label>
                  <textarea className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" rows={3} defaultValue={selectedRole.scope}></textarea>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">Sensitive Access</div>
                      <div className="text-xs text-slate-500 mt-1">This role has {selectedRole.sensitiveAccess.toLowerCase()} access to customer KYC or vendor bank details.</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <Activity className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">Audit Requirements</div>
                      <div className="text-xs text-slate-500 mt-1">All mutations by this role will be strictly logged.</div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Permission Matrix</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Module</th>
                      <th className="px-4 py-3 text-center">View</th>
                      <th className="px-4 py-3 text-center">Create</th>
                      <th className="px-4 py-3 text-center">Edit</th>
                      <th className="px-4 py-3 text-center">Delete</th>
                      <th className="px-4 py-3 text-center">Approve</th>
                      <th className="px-4 py-3 text-center">Export</th>
                      <th className="px-4 py-3 text-center text-rose-600">Sens. View</th>
                      <th className="px-4 py-3 text-center text-rose-600">Sens. Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {permissionModulesMock.map(mod => (
                      <tr key={mod} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-800">{mod}</td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1'} /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1'} /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1'} /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1' || selectedRole.id === 'R2'} /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1' || selectedRole.id === 'R8'} /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-rose-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1' || selectedRole.id === 'R8' || selectedRole.id === 'R11'} /></td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-rose-600 rounded border-slate-300" defaultChecked={selectedRole.id === 'R1'} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
\`;

fs.writeFileSync(rolesPagePath, rolesPageContent);
console.log('Roles page updated successfully');
