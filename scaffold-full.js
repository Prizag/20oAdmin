const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');
const libDir = path.join(srcDir, 'lib');
const apiDir = path.join(libDir, 'api');
const mockDir = path.join(libDir, 'mock-data');

const routes = {
  admin: [
    'dashboard', 'users', 'roles', 'products', 'products/[id]', 'feed-updates',
    'categories', 'pricing', 'exchange-rates', 'orders', 'orders/[id]',
    'vendors', 'vendors/[id]', 'china-ops', 'hub', 'logistics', 'refunds',
    'wallets', 'tickets', 'finance', 'reports', 'cms', 'reviews',
    'notifications', 'audit-logs', 'settings'
  ],
  china: [
    'dashboard', 'tasks', 'tasks/[id]', 'cartons', 'shipments', 'issues'
  ],
  hub: [
    'dashboard', 'inbound-cartons', 'cartons/[id]', 'qc', 'packing',
    'courier', 'handover', 'exceptions', 'reports'
  ],
  vendor: [
    'dashboard', 'onboarding', 'profile', 'documents', 'subscription',
    'products', 'products/new', 'products/import', 'orders', 'returns',
    'payouts', 'reports', 'support', 'rating'
  ]
};

const apiServices = [
  'auth', 'usersRoles', 'products', 'productFeed', 'categories', 'pricing',
  'exchangeRates', 'orders', 'vendors', 'chinaOps', 'hubOps', 'logistics',
  'refunds', 'wallets', 'supportTickets', 'finance', 'reports', 'cms',
  'reviews', 'notifications', 'auditLogs', 'settings'
];

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toTitleCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getIconForAdminRoute(r) {
  if (r.includes('dashboard')) return 'LayoutDashboard';
  if (r.includes('order')) return 'ShoppingCart';
  if (r.includes('product')) return 'Package';
  if (r.includes('feed')) return 'Rss';
  if (r.includes('categor')) return 'Tags';
  if (r.includes('pricing') || r.includes('rate')) return 'DollarSign';
  if (r.includes('vendor')) return 'Store';
  if (r.includes('china')) return 'Globe';
  if (r.includes('hub')) return 'Building2';
  if (r.includes('logistic')) return 'Truck';
  if (r.includes('refund') || r.includes('wallet') || r.includes('finance')) return 'CreditCard';
  if (r.includes('ticket')) return 'LifeBuoy';
  if (r.includes('report')) return 'BarChart2';
  if (r.includes('cms') || r.includes('review')) return 'FileText';
  if (r.includes('notification')) return 'Bell';
  if (r.includes('user') || r.includes('role')) return 'Users';
  if (r.includes('audit')) return 'Shield';
  if (r.includes('setting')) return 'Settings';
  return 'Circle';
}

function getIconForChinaRoute(r) {
  if (r.includes('dashboard')) return 'LayoutDashboard';
  if (r.includes('task')) return 'ClipboardList';
  if (r.includes('carton')) return 'Box';
  if (r.includes('shipment')) return 'Plane';
  if (r.includes('issue')) return 'AlertTriangle';
  return 'Circle';
}

function getIconForHubRoute(r) {
  if (r.includes('dashboard')) return 'LayoutDashboard';
  if (r.includes('inbound') || r.includes('carton')) return 'PackageOpen';
  if (r.includes('qc')) return 'CheckSquare';
  if (r.includes('pack')) return 'Archive';
  if (r.includes('courier') || r.includes('handover')) return 'Truck';
  if (r.includes('exception')) return 'AlertTriangle';
  if (r.includes('report')) return 'BarChart2';
  return 'Circle';
}

function getIconForVendorRoute(r) {
  if (r.includes('dashboard')) return 'LayoutDashboard';
  if (r.includes('onboard') || r.includes('profile')) return 'User';
  if (r.includes('document')) return 'FileText';
  if (r.includes('subscription')) return 'CreditCard';
  if (r.includes('product')) return 'Package';
  if (r.includes('order')) return 'ShoppingCart';
  if (r.includes('return')) return 'RotateCcw';
  if (r.includes('payout') || r.includes('report')) return 'PieChart';
  if (r.includes('support')) return 'LifeBuoy';
  if (r.includes('rating')) return 'Star';
  return 'Circle';
}

function generateSidebarLinks(panel, paths) {
  const links = [];
  const uniquePaths = paths.filter(p => !p.includes('[id]') && !p.includes('new') && !p.includes('import'));
  uniquePaths.forEach(p => {
    let icon = 'Circle';
    if (panel === 'admin') icon = getIconForAdminRoute(p);
    else if (panel === 'china') icon = getIconForChinaRoute(p);
    else if (panel === 'hub') icon = getIconForHubRoute(p);
    else if (panel === 'vendor') icon = getIconForVendorRoute(p);

    links.push(`
            <li>
              <Link href="/${panel}/${p}" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                <${icon} className="mr-3 h-5 w-5 text-slate-400" />
                ${toTitleCase(p)}
              </Link>
            </li>`);
  });
  return links.join('\n');
}

function getImports(panel, paths) {
  const icons = new Set();
  const uniquePaths = paths.filter(p => !p.includes('[id]') && !p.includes('new') && !p.includes('import'));
  uniquePaths.forEach(p => {
    let icon = 'Circle';
    if (panel === 'admin') icon = getIconForAdminRoute(p);
    else if (panel === 'china') icon = getIconForChinaRoute(p);
    else if (panel === 'hub') icon = getIconForHubRoute(p);
    else if (panel === 'vendor') icon = getIconForVendorRoute(p);
    icons.add(icon);
  });
  return Array.from(icons).join(', ');
}

function createLayout(panelDir, panel, title) {
  const filePath = path.join(panelDir, 'layout.tsx');
  const sidebarLinks = generateSidebarLinks(panel, routes[panel]);
  const imports = getImports(panel, routes[panel]);

  const content = `import { ReactNode } from 'react';
import Link from 'next/link';
import { ${imports} } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">20o.in</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">${title}</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            ${sidebarLinks}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">${title}</h1>
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
`;
  fs.writeFileSync(filePath, content);
}

function createPage(routePath, title) {
  const filePath = path.join(routePath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">${title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <p className="text-slate-600">Mock content for ${title}. This module is working and ready for real backend integration.</p>
      </div>
    </div>
  );
}
`);
  }
}

function createApiServices() {
  createDir(apiDir);
  apiServices.forEach(s => {
    const filePath = path.join(apiDir, `${s}.ts`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `export const ${s}Service = {
  getAll: async () => {
    console.log('Mock API call to get all ${s}');
    return [];
  },
  getById: async (id: string) => {
    console.log(\`Mock API call to get ${s} by id: \${id}\`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create ${s}', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(\`Mock API call to update ${s} \${id}\`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(\`Mock API call to delete ${s} \${id}\`);
    return { success: true };
  }
};
`);
    }
  });
}

createDir(appDir);

// Generate routes
for (const [panel, paths] of Object.entries(routes)) {
  const panelDir = path.join(appDir, panel);
  createDir(panelDir);
  
  const titleMap = {
    admin: 'Admin Panel',
    china: 'China Team Panel',
    hub: 'Transit Hub Panel',
    vendor: 'Vendor Panel'
  };
  
  createLayout(panelDir, panel, titleMap[panel]);
  
  for (const p of paths) {
    const routeDir = path.join(panelDir, ...p.split('/'));
    createDir(routeDir);
    
    // Capitalize and format title
    const titleParts = p.split('/');
    const lastPart = titleParts[titleParts.length - 1];
    const title = lastPart.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    createPage(routeDir, title.replace(/\[/g, '').replace(/\]/g, ' Detail'));
  }
}

createApiServices();

console.log('Scaffolding complete!');
