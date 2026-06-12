import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, User, FileText, CreditCard, Package, ShoppingCart, RotateCcw, PieChart, LifeBuoy, Star } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">20o.in</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Vendor Panel</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            
            <li>
              <Link href="/vendor/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <LayoutDashboard className="mr-3 h-5 w-5 text-slate-400" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/vendor/onboarding" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <User className="mr-3 h-5 w-5 text-slate-400" />
                Onboarding
              </Link>
            </li>

            <li>
              <Link href="/vendor/profile" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <User className="mr-3 h-5 w-5 text-slate-400" />
                Profile
              </Link>
            </li>

            <li>
              <Link href="/vendor/documents" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <FileText className="mr-3 h-5 w-5 text-slate-400" />
                Documents
              </Link>
            </li>

            <li>
              <Link href="/vendor/subscription" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <CreditCard className="mr-3 h-5 w-5 text-slate-400" />
                Subscription
              </Link>
            </li>

            <li>
              <Link href="/vendor/products" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <Package className="mr-3 h-5 w-5 text-slate-400" />
                Products
              </Link>
            </li>

            <li>
              <Link href="/vendor/orders" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <ShoppingCart className="mr-3 h-5 w-5 text-slate-400" />
                Orders
              </Link>
            </li>

            <li>
              <Link href="/vendor/returns" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <RotateCcw className="mr-3 h-5 w-5 text-slate-400" />
                Returns
              </Link>
            </li>

            <li>
              <Link href="/vendor/payouts" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <PieChart className="mr-3 h-5 w-5 text-slate-400" />
                Payouts
              </Link>
            </li>

            <li>
              <Link href="/vendor/reports" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <PieChart className="mr-3 h-5 w-5 text-slate-400" />
                Reports
              </Link>
            </li>

            <li>
              <Link href="/vendor/support" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <LifeBuoy className="mr-3 h-5 w-5 text-slate-400" />
                Support
              </Link>
            </li>

            <li>
              <Link href="/vendor/rating" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <Star className="mr-3 h-5 w-5 text-slate-400" />
                Rating
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">Vendor Panel</h1>
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
