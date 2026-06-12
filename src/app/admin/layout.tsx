'use client';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Package, Rss, Tags, DollarSign, ShoppingCart, Store, 
  Globe, Building2, Truck, CreditCard, LifeBuoy, BarChart2, FileText, Bell, 
  Shield, Settings, CheckCircle2, ListFilter
} from 'lucide-react';
import { rolesMock } from '@/lib/mock-data/roles-mock';

// Grouping logic for role-based sidebar
const getVisibleLinks = (roleId: string) => {
  const role = rolesMock.find(r => r.id === roleId) || rolesMock[0];
  const roleName = role.name;

  const allLinks = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['Super Admin', 'Admin Manager', 'Product Manager', 'Order Manager', 'Finance Manager'] },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders', roles: ['Super Admin', 'Admin Manager', 'Order Manager', 'Customer Support Agent'] },
    { href: '/admin/products', icon: Package, label: 'Products', roles: ['Super Admin', 'Admin Manager', 'Product Manager'] },
    { href: '/admin/feed-updates', icon: Rss, label: 'Feed Updates', roles: ['Super Admin', 'Product Manager'] },
    { href: '/admin/categories', icon: Tags, label: 'Categories', roles: ['Super Admin', 'Product Manager'] },
    { href: '/admin/pricing', icon: DollarSign, label: 'Pricing', roles: ['Super Admin', 'Product Manager'] },
    { href: '/admin/exchange-rates', icon: DollarSign, label: 'Exchange Rates', roles: ['Super Admin'] },
    { href: '/admin/vendors', icon: Store, label: 'Vendors', roles: ['Super Admin', 'Admin Manager', 'Vendor Manager'] },
    { href: '/admin/china-ops', icon: Globe, label: 'China Ops', roles: ['Super Admin', 'Admin Manager', 'Order Manager'] },
    { href: '/admin/hub', icon: Building2, label: 'Transit Hub', roles: ['Super Admin', 'Admin Manager', 'Order Manager'] },
    { href: '/admin/logistics', icon: Truck, label: 'Logistics', roles: ['Super Admin', 'Admin Manager', 'Order Manager'] },
    { href: '/admin/refunds', icon: CreditCard, label: 'Refunds', roles: ['Super Admin', 'Admin Manager', 'Order Manager', 'Customer Support Agent'] },
    { href: '/admin/wallets', icon: CreditCard, label: 'Wallets', roles: ['Super Admin', 'Finance Manager', 'Customer Support Agent'] },
    { href: '/admin/tickets', icon: LifeBuoy, label: 'Tickets', roles: ['Super Admin', 'Admin Manager', 'Customer Support Agent'] },
    { href: '/admin/finance', icon: BarChart2, label: 'Finance', roles: ['Super Admin', 'Finance Manager'] },
    { href: '/admin/reports', icon: BarChart2, label: 'Reports', roles: ['Super Admin', 'Admin Manager', 'Finance Manager', 'Read-only Auditor'] },
    { href: '/admin/cms', icon: FileText, label: 'Marketing / CMS', roles: ['Super Admin', 'Marketing / CMS Manager'] },
    { href: '/admin/reviews', icon: FileText, label: 'Reviews', roles: ['Super Admin', 'Vendor Manager', 'Marketing / CMS Manager'] },
    { href: '/admin/users', icon: Users, label: 'Admin Users', roles: ['Super Admin'] },
    { href: '/admin/roles', icon: Shield, label: 'Roles & Permissions', roles: ['Super Admin'] },
    { href: '/admin/audit-logs', icon: ListFilter, label: 'Audit Logs', roles: ['Super Admin', 'Read-only Auditor'] },
    { href: '/admin/settings', icon: Settings, label: 'Settings', roles: ['Super Admin'] },
  ];

  if (roleName === 'Super Admin') return allLinks;
  
  return allLinks.filter(link => link.roles.includes(roleName));
};

export default function Layout({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState('R1'); // Default Super Admin
  const pathname = usePathname();
  const visibleLinks = getVisibleLinks(activeRole);
  const currentRoleObj = rolesMock.find(r => r.id === activeRole);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-xl z-20">
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center">
            20o.in <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">PRO</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium tracking-wide">OPERATIONS PANEL</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Modules</div>
          <ul className="space-y-1 px-2">
            {visibleLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 flex-shrink-0 shadow-sm z-10 relative">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-800 hidden md:block">
              {visibleLinks.find(l => pathname.startsWith(l.href))?.label || 'Admin Panel'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Viewing As:</span>
              <select 
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-indigo-700 focus:ring-0 cursor-pointer outline-none"
              >
                {rolesMock.filter(r => r.type === 'Internal Admin').map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md cursor-pointer border-2 border-white ring-2 ring-slate-100">
                {currentRoleObj?.name.charAt(0)}
              </div>
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
