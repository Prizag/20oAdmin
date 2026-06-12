import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, PackageOpen, CheckSquare, Archive, Truck, AlertTriangle, BarChart2 } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">20o.in</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Transit Hub Panel</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            
            <li>
              <Link href="/hub/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <LayoutDashboard className="mr-3 h-5 w-5 text-slate-400" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/hub/inbound-cartons" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <PackageOpen className="mr-3 h-5 w-5 text-slate-400" />
                Inbound Cartons
              </Link>
            </li>

            <li>
              <Link href="/hub/qc" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <CheckSquare className="mr-3 h-5 w-5 text-slate-400" />
                Qc
              </Link>
            </li>

            <li>
              <Link href="/hub/packing" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <Archive className="mr-3 h-5 w-5 text-slate-400" />
                Packing
              </Link>
            </li>

            <li>
              <Link href="/hub/courier" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <Truck className="mr-3 h-5 w-5 text-slate-400" />
                Courier
              </Link>
            </li>

            <li>
              <Link href="/hub/handover" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <Truck className="mr-3 h-5 w-5 text-slate-400" />
                Handover
              </Link>
            </li>

            <li>
              <Link href="/hub/exceptions" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <AlertTriangle className="mr-3 h-5 w-5 text-slate-400" />
                Exceptions
              </Link>
            </li>

            <li>
              <Link href="/hub/reports" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <BarChart2 className="mr-3 h-5 w-5 text-slate-400" />
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">Transit Hub Panel</h1>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700">
               U
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto relative">
          {children}
        </div>
      </main>
    </div>
  );
}
