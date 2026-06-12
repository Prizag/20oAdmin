'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, ShieldAlert, Activity, Check, X } from 'lucide-react';
import { rolesMock, permissionModulesMock } from '@/lib/mock-data/roles-mock';

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
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rolesMock.map(role => (
                <tr key={role.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{role.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${role.type === 'Internal Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}`}>
                      {role.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs max-w-xs truncate" title={role.scope}>{role.scope}</td>
                  <td className="px-6 py-4 font-medium">{role.users}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${role.sensitiveAccess === 'Yes' ? 'bg-rose-100 text-rose-700' : role.sensitiveAccess === 'Limited' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                      {role.sensitiveAccess}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center text-xs font-medium ${role.status === 'Active' ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {role.status === 'Active' ? <Check className="w-3.5 h-3.5 mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />}
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedRole(role)}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-xs mr-3"
                    >
                      View Matrix
                    </button>
                    <button className="text-slate-500 hover:text-slate-700 font-medium text-xs">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRole && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-5xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedRole.name} Matrix</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedRole.type} &bull; Priority: {selectedRole.priority}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Save Permissions</button>
                <button onClick={() => setSelectedRole(null)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Close</button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role Scope & Description</label>
                  <textarea className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50" rows={3} defaultValue={selectedRole.scope} readOnly></textarea>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">Sensitive Access: {selectedRole.sensitiveAccess}</div>
                      <div className="text-xs text-slate-500 mt-1 leading-relaxed">This role may access KYC or bank data. Audit logging is strictly enforced.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Module Permission Matrix</h3>
                <div className="text-xs text-slate-500 flex gap-4">
                  <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div> Allowed</span>
                  <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-slate-200 mr-2"></div> Denied</span>
                </div>
              </div>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Module / Resource</th>
                      <th className="px-2 py-3 text-center">View</th>
                      <th className="px-2 py-3 text-center">Create</th>
                      <th className="px-2 py-3 text-center">Edit</th>
                      <th className="px-2 py-3 text-center">Delete</th>
                      <th className="px-2 py-3 text-center">Approve</th>
                      <th className="px-2 py-3 text-center">Export</th>
                      <th className="px-2 py-3 text-center text-rose-600">Sens. View</th>
                      <th className="px-2 py-3 text-center text-rose-600">Sens. Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {permissionModulesMock.map((mod, index) => {
                      // Determine mock check logic based on role ID to make it look realistic
                      const isSuperAdmin = selectedRole.id === 'R1';
                      const isManager = ['R2','R3','R4','R7','R8'].includes(selectedRole.id);
                      const isAuditor = selectedRole.id === 'R12';
                      const hasAccess = isSuperAdmin || (isManager && index % 2 === 0) || (isAuditor);
                      const canEdit = isSuperAdmin || (isManager && hasAccess);
                      const canDelete = isSuperAdmin;
                      const canApprove = isSuperAdmin || (isManager && index % 3 === 0);
                      const canExport = isSuperAdmin || selectedRole.id === 'R8' || isAuditor;
                      const canSensView = isSuperAdmin || (selectedRole.sensitiveAccess !== 'No' && index % 4 === 0);
                      const canSensEdit = isSuperAdmin || (selectedRole.sensitiveAccess === 'Yes' && index % 5 === 0);

                      return (
                        <tr key={mod} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-medium text-slate-800">{mod}</td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={hasAccess} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={canEdit} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={canEdit} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={canDelete} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={canApprove} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" defaultChecked={canExport} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-rose-600 rounded border-rose-300 focus:ring-rose-500" defaultChecked={canSensView} /></td>
                          <td className="px-2 py-3 text-center"><input type="checkbox" className="w-4 h-4 text-rose-600 rounded border-rose-300 focus:ring-rose-500" defaultChecked={canSensEdit} /></td>
                        </tr>
                      );
                    })}
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