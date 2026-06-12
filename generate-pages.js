const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');

// Reusable template generator
function generatePage(config) {
  const { title, subtitle, metrics, table, tabs, detailView } = config;

  let imports = `import React from 'react';\nimport { Search, Filter, Plus, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileText, Settings, Users, ArrowRight, Package } from 'lucide-react';\n`;

  let metricsHtml = '';
  if (metrics && metrics.length > 0) {
    metricsHtml = `
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        ${metrics.map(m => `
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium mb-1">${m.label}</h3>
          <p className="text-2xl font-bold text-slate-900">${m.value}</p>
        </div>
        `).join('')}
      </div>
    `;
  }

  let tableHtml = '';
  if (table) {
    const cols = table.columns.map(c => `<th className="px-6 py-4 font-medium">${c}</th>`).join('');
    const rows = table.rows.map(r => {
      const cells = table.columns.map(c => {
        let val = r[c] || '-';
        if (typeof val === 'string' && val.includes('Badge:')) {
          const badgeText = val.replace('Badge:', '').trim();
          let color = 'bg-slate-100 text-slate-700';
          if (badgeText.match(/Active|Delivered|Clear|Prepaid|Approve|Success/i)) color = 'bg-emerald-100 text-emerald-700';
          else if (badgeText.match(/Pending|Warning|Review|Process|Transit/i)) color = 'bg-amber-100 text-amber-700';
          else if (badgeText.match(/Reject|Breach|Fail|Error|Loss/i)) color = 'bg-rose-100 text-rose-700';
          else if (badgeText.match(/China/i)) color = 'bg-blue-100 text-blue-700';
          
          val = `<span className="px-2.5 py-1 rounded-full text-xs font-medium ${color}">${badgeText}</span>`;
        }
        return `<td className="px-6 py-4">${val}</td>`;
      }).join('');
      return `<tr className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">${cells}</tr>`;
    }).join('');

    tableHtml = `
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"/>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg shadow-sm flex items-center transition-colors hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>${cols}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  let tabsHtml = '';
  if (tabs && tabs.length > 0) {
    tabsHtml = `
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px px-4" aria-label="Tabs">
            ${tabs.map((t, i) => `
              <button className="whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${i === 0 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}">
                ${t}
              </button>
            `).join('')}
          </nav>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">${tabs[0]} Content</h3>
          <p className="text-slate-600">This section allows you to manage ${tabs[0].toLowerCase()} details. Mock content specifically generated for this tab context.</p>
        </div>
      </div>
    `;
  }

  let detailHtml = '';
  if (detailView) {
    detailHtml = `
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Detailed Information</h3>
        <div className="grid grid-cols-2 gap-4">
          ${detailView.map(kv => `
            <div>
              <p className="text-sm font-medium text-slate-500">${kv.label}</p>
              <p className="mt-1 text-sm text-slate-900">${kv.value}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
'use client';
${imports}

export default function Page() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">${title}</h1>
          <p className="text-sm text-slate-500 mt-1">${subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center text-sm">
            Action
          </button>
        </div>
      </div>
      
      ${metricsHtml}
      ${detailHtml}
      ${tabsHtml}
      ${tableHtml}
    </div>
  );
}
  `;
}

// Configuration dictionary
const pageConfigs = {
  // ADMIN ROUTES
  'admin/users': {
    title: 'Admin Users', subtitle: 'Manage internal platform access and roles.',
    metrics: [{label: 'Total Users', value: '24'}, {label: 'Active', value: '22'}, {label: '2FA Enabled', value: '18'}],
    table: {
      columns: ['Name', 'Role', 'Department', '2FA Status', 'Last Login', 'Status', 'Action'],
      rows: [
        {'Name': 'Rahul S', 'Role': 'Super Admin', 'Department': 'Tech', '2FA Status': 'Badge:Active', 'Last Login': '1 hr ago', 'Status': 'Badge:Active', 'Action': 'Edit'},
        {'Name': 'Priya M', 'Role': 'Finance Manager', 'Department': 'Finance', '2FA Status': 'Badge:Active', 'Last Login': '5 mins ago', 'Status': 'Badge:Active', 'Action': 'Edit'}
      ]
    }
  },
  'admin/roles': {
    title: 'Roles & Permissions', subtitle: 'Define access matrices for the organization.',
    table: {
      columns: ['Role Name', 'Users', 'Permissions Summary', 'Sensitive Access', 'Action'],
      rows: [
        {'Role Name': 'Super Admin', 'Users': '2', 'Permissions Summary': 'All Access', 'Sensitive Access': 'Badge:Yes', 'Action': 'Edit'},
        {'Role Name': 'Order Manager', 'Users': '5', 'Permissions Summary': 'Orders, Refunds (up to threshold)', 'Sensitive Access': 'Badge:No', 'Action': 'Edit'}
      ]
    }
  },
  'admin/categories': {
    title: 'Category Management', subtitle: 'Manage department, categories, and attributes.',
    table: {
      columns: ['Category', 'Department', 'Attributes', 'Status', 'Compliance Warning', 'Action'],
      rows: [
        {'Category': 'Electronics', 'Department': 'Home', 'Attributes': 'Voltage, Warranty', 'Status': 'Badge:Active', 'Compliance Warning': 'Badge:Warning', 'Action': 'Edit'},
        {'Category': 'Men Fashion', 'Department': 'Clothing', 'Attributes': 'Size, Color, Material', 'Status': 'Badge:Active', 'Compliance Warning': 'Badge:Clear', 'Action': 'Edit'}
      ]
    }
  },
  'admin/pricing': {
    title: 'Pricing Engine', subtitle: 'Configure landed cost calculator and margins.',
    tabs: ['Formula Builder', 'Category Overrides', 'Viral Product Overrides', 'Margin Guard'],
    detailView: [
      {label: 'Default China Formula', value: '((Cost + Freight + Duty + Return Rsrv) * Exch Rate) + Margin'},
      {label: 'Minimum Margin Guard', value: '15%'}
    ]
  },
  'admin/exchange-rates': {
    title: 'Exchange Rates', subtitle: 'Manage CNY to INR conversion rates.',
    metrics: [{label: '3-Day Average', value: '11.85 INR'}, {label: 'Current Spot', value: '11.82 INR'}, {label: 'Locked Rate', value: 'None'}],
    table: {
      columns: ['Date', 'Source', 'Spot Rate', 'Applied Rate', 'Override Reason', 'Status'],
      rows: [
        {'Date': '2026-06-12', 'Source': 'API (Auto)', 'Spot Rate': '11.82', 'Applied Rate': '11.85', 'Override Reason': '-', 'Status': 'Badge:Active'},
        {'Date': '2026-06-11', 'Source': 'Manual', 'Spot Rate': '11.80', 'Applied Rate': '12.00', 'Override Reason': 'Buffer required', 'Status': 'Badge:Archived'}
      ]
    }
  },
  'admin/vendors': {
    title: 'Indian Vendors', subtitle: 'Manage vendor onboarding, KYC, and performance.',
    metrics: [{label: 'Total Vendors', value: '145'}, {label: 'Pending KYC', value: '12'}, {label: 'Avg Rating', value: '4.2'}],
    table: {
      columns: ['Vendor Name', 'City', 'Subscription', 'Rating', 'KYC Status', 'Action'],
      rows: [
        {'Vendor Name': 'Surya Fashions', 'City': 'Delhi', 'Subscription': 'Badge:Active', 'Rating': '4.5', 'KYC Status': 'Badge:Approved', 'Action': 'View Profile'},
        {'Vendor Name': 'TechGadgets India', 'City': 'Bangalore', 'Subscription': 'Badge:Expiring Soon', 'Rating': '3.8', 'KYC Status': 'Badge:Pending Review', 'Action': 'Review KYC'}
      ]
    }
  },
  'admin/vendors/[id]': {
    title: 'Vendor Profile: Surya Fashions', subtitle: 'ID: VEN-9923',
    tabs: ['Profile', 'KYC/Documents', 'Bank Details (Restricted)', 'Products', 'Orders', 'Subscription', 'Rating Breakdown', 'Payouts'],
    detailView: [
      {label: 'Business Name', value: 'Surya Fashions Pvt Ltd'},
      {label: 'Owner', value: 'Amit Verma'},
      {label: 'GSTIN', value: '07AAAAA0000A1Z5'},
      {label: 'Account Manager', value: 'Sneha T.'}
    ]
  },
  'admin/products/[id]': {
    title: 'Product: Wireless Earbuds TWS-200', subtitle: 'ID: PRD-C-001 | Source: China Product Feed',
    tabs: ['Overview', 'Variants', 'Images', 'Pricing', 'Compliance', 'Delivery', 'Reviews', 'Feed/Override History', 'Audit History'],
    detailView: [
      {label: 'Source Product ID', value: '1688-9928374'},
      {label: 'Status', value: 'Active'},
      {label: 'Landed Cost', value: '₹850'},
      {label: 'Selling Price', value: '₹1299'}
    ]
  },
  'admin/orders/[id]': {
    title: 'Order: ORD-2026-9001', subtitle: 'Placed: 12 June 2026 | Mode: Prepaid',
    tabs: ['Order Summary', 'Fulfillment Groups', 'Products', 'Internal Timeline', 'Shipment Tracking', 'Refunds/Tickets', 'Internal Notes'],
    detailView: [
      {label: 'Customer', value: 'Rahul Sharma (+91-9876543210)'},
      {label: 'Total Value', value: '₹4500'},
      {label: 'Source Mix', value: 'China (1 item), Indian Vendor (2 items)'},
      {label: 'Customer Status', value: 'Shipping in Process'}
    ]
  },
  'admin/china-ops': {
    title: 'China Operations Overview', subtitle: 'Admin view of China team tasks and margins.',
    metrics: [{label: 'Tasks Pending', value: '89'}, {label: 'Delayed', value: '5'}, {label: 'Margin Loss Alerts', value: '2'}],
    table: {
      columns: ['Task ID', 'Product', 'Budget', 'Actual Cost', 'Status', 'SLA', 'Escalation'],
      rows: [
        {'Task ID': 'TSK-101', 'Product': 'Earbuds', 'Budget': '¥45.00', 'Actual Cost': '-', 'Status': 'Badge:Pending', 'SLA': 'On Time', 'Escalation': '-'},
        {'Task ID': 'TSK-102', 'Product': 'Clock', 'Budget': '¥120.00', 'Actual Cost': '¥130.00', 'Status': 'Badge:Purchased', 'SLA': 'Breached', 'Escalation': 'Badge:Margin Alert'}
      ]
    }
  },
  'admin/hub': {
    title: 'Transit Hub Overview', subtitle: 'Admin view of inbound and outbound flow at India hub.',
    metrics: [{label: 'Cartons Inbound', value: '12'}, {label: 'Received Today', value: '8'}, {label: 'Exceptions', value: '2'}],
    table: {
      columns: ['Carton ID', 'Expected Items', 'Status', 'Aging', 'Exceptions'],
      rows: [
        {'Carton ID': 'CRT-001', 'Expected Items': '45', 'Status': 'Badge:Received', 'Aging': '2 hours', 'Exceptions': '-'},
        {'Carton ID': 'CRT-002', 'Expected Items': '10', 'Status': 'Badge:Pending', 'Aging': '-', 'Exceptions': 'Badge:Courier Delay'}
      ]
    }
  },
  'admin/logistics': {
    title: 'Logistics & Shipments', subtitle: 'Manage courier assignments and tracking.',
    table: {
      columns: ['AWB', 'Order ID', 'Type', 'Courier', 'Status', 'Reverse Pickup'],
      rows: [
        {'AWB': 'AWB-DEL-1001', 'Order ID': 'ORD-9001', 'Type': 'Local', 'Courier': 'Delhivery', 'Status': 'Badge:In Transit', 'Reverse Pickup': 'No'},
        {'AWB': 'AWB-BD-2002', 'Order ID': 'ORD-9002', 'Type': 'Local', 'Courier': 'BlueDart', 'Status': 'Badge:Delivered', 'Reverse Pickup': 'No'}
      ]
    }
  },
  'admin/refunds': {
    title: 'Refunds & Approvals', subtitle: 'Manage wallet, bank, and returnless refunds.',
    metrics: [{label: 'Pending Approvals', value: '14'}, {label: 'High-Value', value: '3'}, {label: 'Processed Today', value: '₹25,000'}],
    table: {
      columns: ['Refund ID', 'Order/Ticket', 'Type', 'Amount', 'Deduction Fee', 'Status', 'Action'],
      rows: [
        {'Refund ID': 'REF-001', 'Order/Ticket': 'ORD-9001', 'Type': 'Wallet (Returnless)', 'Amount': '₹450', 'Deduction Fee': '₹0', 'Status': 'Badge:Pending Approval', 'Action': 'Review'},
        {'Refund ID': 'REF-002', 'Order/Ticket': 'ORD-9002', 'Type': 'Bank Source', 'Amount': '₹1200', 'Deduction Fee': '₹100', 'Status': 'Badge:High-Value Approval', 'Action': 'Review'}
      ]
    }
  },
  'admin/wallets': {
    title: 'Wallet Ledgers', subtitle: 'Customer wallet balances and transactions.',
    table: {
      columns: ['Transaction ID', 'Customer', 'Type', 'Amount', 'Link', 'Date'],
      rows: [
        {'Transaction ID': 'WTX-101', 'Customer': 'Rahul Sharma', 'Type': 'Credit (Refund)', 'Amount': '₹450', 'Link': 'REF-001', 'Date': '12 Jun 2026'},
        {'Transaction ID': 'WTX-102', 'Customer': 'Priya Singh', 'Type': 'Debit (Payment)', 'Amount': '₹-1299', 'Link': 'ORD-9002', 'Date': '11 Jun 2026'}
      ]
    }
  },
  'admin/tickets': {
    title: 'Support Tickets', subtitle: 'Manage customer and vendor issues.',
    table: {
      columns: ['Ticket ID', 'Category', 'Priority', 'Linked ID', 'Status', 'SLA', 'Agent'],
      rows: [
        {'Ticket ID': 'TCK-501', 'Category': 'Damaged Item', 'Priority': 'High', 'Linked ID': 'ORD-9001', 'Status': 'Badge:Open', 'SLA': 'Breached', 'Agent': 'Unassigned'},
        {'Ticket ID': 'TCK-502', 'Category': 'KYC Issue', 'Priority': 'Medium', 'Linked ID': 'VEN-9923', 'Status': 'Badge:Pending Customer', 'SLA': 'On Time', 'Agent': 'Sneha'}
      ]
    }
  },
  'admin/finance': {
    title: 'Finance & Accounting', subtitle: 'Invoices, GST, payouts, and CSV exports.',
    tabs: ['Invoice Dashboard', 'GST Reports', 'Vendor Payouts', 'China Import Report', 'TCS/TDS', 'Tally/Zoho Export', 'Profitability'],
    metrics: [{label: 'Net Revenue', value: '₹9.8L'}, {label: 'Pending Payouts', value: '₹1.2L'}, {label: 'Wallet Liability', value: '₹45K'}]
  },
  'admin/reports': {
    title: 'Reports & Analytics', subtitle: 'Data insights for platform performance.',
    tabs: ['Sales', 'Profit', 'China Operations', 'Hub', 'Vendor Performance', 'Product Health', 'Marketing', 'Support']
  },
  'admin/cms': {
    title: 'CMS & Marketing', subtitle: 'Banners, coupons, and SEO controls.',
    tabs: ['Homepage Banners', 'Collections', 'Coupons & Campaigns', 'SEO Controls'],
    table: {
      columns: ['Campaign Name', 'Type', 'Status', 'Usage', 'Action'],
      rows: [
        {'Campaign Name': 'SUMMER20', 'Type': 'Coupon', 'Status': 'Badge:Active', 'Usage': '145/500', 'Action': 'Edit'},
        {'Campaign Name': 'Hero Banner 1', 'Type': 'Banner', 'Status': 'Badge:Active', 'Usage': '-', 'Action': 'Edit'}
      ]
    }
  },
  'admin/reviews': {
    title: 'Reviews & Ratings', subtitle: 'Moderate customer reviews and photos.',
    table: {
      columns: ['Product', 'Rating', 'Comment', 'Photos', 'Status', 'Action'],
      rows: [
        {'Product': 'TWS-200', 'Rating': '5 Star', 'Comment': 'Excellent product', 'Photos': 'Yes', 'Status': 'Badge:Approved', 'Action': 'Hide'},
        {'Product': 'Cotton T-Shirt', 'Rating': '1 Star', 'Comment': 'Bad quality', 'Photos': 'No', 'Status': 'Badge:Pending Review', 'Action': 'Approve'}
      ]
    }
  },
  'admin/notifications': {
    title: 'Notification Center', subtitle: 'Email, SMS, WhatsApp logs and templates.',
    tabs: ['Logs', 'Event Templates', 'Provider Settings']
  },
  'admin/audit-logs': {
    title: 'Audit & Security Logs', subtitle: 'System changes, KYC access, and exports.',
    tabs: ['System Changes', 'KYC Access Logs', 'Export Logs', 'Login History'],
    table: {
      columns: ['Timestamp', 'Actor', 'Role', 'Action', 'Entity', 'IP Address'],
      rows: [
        {'Timestamp': '12 Jun, 10:30', 'Actor': 'Rahul S', 'Role': 'Super Admin', 'Action': 'Update Price Override', 'Entity': 'PRD-C-001', 'IP Address': '192.168.1.1'},
        {'Timestamp': '12 Jun, 09:15', 'Actor': 'System', 'Role': 'System', 'Action': 'Export Tally CSV', 'Entity': 'Finance Module', 'IP Address': 'Server'}
      ]
    }
  },
  'admin/settings': {
    title: 'Platform Settings', subtitle: 'Global configurations and integrations.',
    tabs: ['General', 'Pricing Rules', 'Shipping Rules', 'KYC Settings', 'Payment Providers', 'Logistics Providers', 'Compliance Warnings']
  },

  // CHINA TEAM ROUTES
  'china/tasks': {
    title: 'Purchase Tasks', subtitle: 'Sourcing and purchasing queue.',
    table: {
      columns: ['Task ID', 'Product', 'Qty', 'Budget', 'Due', 'Status', 'Action'],
      rows: [
        {'Task ID': 'TSK-101', 'Product': 'Earbuds', 'Qty': '5', 'Budget': '¥45', 'Due': '2h', 'Status': 'Badge:Availability Check', 'Action': 'Open'},
        {'Task ID': 'TSK-102', 'Product': 'Clock', 'Qty': '2', 'Budget': '¥120', 'Due': '4h', 'Status': 'Badge:Purchase Pending', 'Action': 'Open'}
      ]
    }
  },
  'china/tasks/[id]': {
    title: 'Task Detail: TSK-101', subtitle: 'Product: Wireless Earbuds TWS-200',
    detailView: [
      {label: 'Source Product ID', value: '1688-9928374'},
      {label: 'Required Qty', value: '5'},
      {label: 'Max Budget', value: '¥45.00 / unit'},
      {label: 'Bundling Instructions', value: 'Pack securely, ship to India Hub DEL'}
    ],
    tabs: ['Availability Check', 'Purchase Update', 'QC Results', 'Issues']
  },
  'china/cartons': {
    title: 'Cartons Management', subtitle: 'Bundling items for international dispatch.',
    table: {
      columns: ['Carton ID', 'Items Count', 'Weight', 'Dest', 'Status', 'Action'],
      rows: [
        {'Carton ID': 'CRT-001', 'Items Count': '45', 'Weight': '12.5 kg', 'Dest': 'DEL', 'Status': 'Badge:Bundling', 'Action': 'Edit'},
        {'Carton ID': 'CRT-002', 'Items Count': '22', 'Weight': '8.2 kg', 'Dest': 'DEL', 'Status': 'Badge:Ready to Ship', 'Action': 'Print Label'}
      ]
    }
  },
  'china/shipments': {
    title: 'International Shipments', subtitle: 'Tracking cartons sent to India Hub.',
    table: {
      columns: ['Shipment ID', 'Cartons', 'Carrier', 'Tracking No', 'ETA India', 'Status'],
      rows: [
        {'Shipment ID': 'SHP-INT-10', 'Cartons': '5', 'Carrier': 'FedEx', 'Tracking No': 'FDX-123456', 'ETA India': '14 Jun 2026', 'Status': 'Badge:In Transit'}
      ]
    }
  },
  'china/issues': {
    title: 'Escalated Issues', subtitle: 'Problems raised to Admin.',
    table: {
      columns: ['Issue ID', 'Task ID', 'Type', 'Description', 'Status'],
      rows: [
        {'Issue ID': 'ISS-01', 'Task ID': 'TSK-105', 'Type': 'Out of Stock', 'Description': 'Item discontinued by seller.', 'Status': 'Badge:Pending Admin'}
      ]
    }
  },

  // HUB ROUTES
  'hub/inbound-cartons': {
    title: 'Inbound Cartons', subtitle: 'Receiving China shipments.',
    table: {
      columns: ['Carton ID', 'Expected Items', 'From', 'ETA', 'Status', 'Action'],
      rows: [
        {'Carton ID': 'CRT-001', 'Expected Items': '45', 'From': 'China Team', 'ETA': 'Arrived', 'Status': 'Badge:QC Pending', 'Action': 'Start QC'},
        {'Carton ID': 'CRT-002', 'Expected Items': '12', 'From': 'China Team', 'ETA': '2 hours', 'Status': 'Badge:In Transit', 'Action': 'Scan'}
      ]
    }
  },
  'hub/cartons/[id]': {
    title: 'Carton Detail: CRT-001', subtitle: 'Status: QC Pending',
    detailView: [
      {label: 'From', value: 'China Consolidation'},
      {label: 'Expected Items', value: '45'},
      {label: 'Weight', value: '12.5 kg'},
      {label: 'Tracking', value: 'FDX-123456'}
    ],
    tabs: ['Contents to QC', 'Photos', 'Discrepancies']
  },
  'hub/qc': {
    title: 'Hub Quality Check', subtitle: 'Scan and verify received items.',
    tabs: ['Pending QC Scans', 'Failed Items', 'Completed']
  },
  'hub/packing': {
    title: 'Packing & Splitting', subtitle: 'Split cartons into local orders.',
    table: {
      columns: ['Order ID', 'Items Required', 'Weight', 'Dimensions', 'Status', 'Action'],
      rows: [
        {'Order ID': 'ORD-9001', 'Items Required': '1', 'Weight': '0.5 kg', 'Dimensions': '10x10x5 cm', 'Status': 'Badge:Pending Pack', 'Action': 'Print Slip'}
      ]
    }
  },
  'hub/courier': {
    title: 'Local Courier Assignment', subtitle: 'Assign Delhivery/BlueDart labels.',
    table: {
      columns: ['Order ID', 'Destination', 'Courier', 'AWB', 'Status', 'Action'],
      rows: [
        {'Order ID': 'ORD-9001', 'Destination': 'Delhi', 'Courier': 'Delhivery', 'AWB': 'Pending', 'Status': 'Badge:Label Pending', 'Action': 'Generate'},
        {'Order ID': 'ORD-9002', 'Destination': 'Mumbai', 'Courier': 'BlueDart', 'AWB': 'BD-999', 'Status': 'Badge:Label Printed', 'Action': 'Print'}
      ]
    }
  },
  'hub/handover': {
    title: 'Courier Handover', subtitle: 'Scan packages to handover to dispatch trucks.',
    tabs: ['Scan & Manifest', 'Handover History']
  },
  'hub/exceptions': {
    title: 'Hub Exceptions', subtitle: 'Missing items, damages, or courier failures.',
    table: {
      columns: ['Exception ID', 'Type', 'Reference', 'Description', 'Action'],
      rows: [
        {'Exception ID': 'EX-01', 'Type': 'Missing Item', 'Reference': 'CRT-001', 'Description': 'Expected 45, counted 44', 'Action': 'Log'}
      ]
    }
  },
  'hub/reports': {
    title: 'Hub Reports', subtitle: 'Productivity and SLA metrics.',
    tabs: ['Daily Dispatch', 'SLA Breaches', 'Exception Rate']
  },

  // VENDOR ROUTES
  'vendor/onboarding': {
    title: 'Onboarding Checklist', subtitle: 'Complete your profile to go live.',
    tabs: ['Business Details', 'Bank/UPI', 'Pickup Locations', 'Agreements']
  },
  'vendor/profile': {
    title: 'Vendor Profile', subtitle: 'Manage your public and internal information.',
    detailView: [
      {label: 'Business Name', value: 'Surya Fashions Pvt Ltd'},
      {label: 'Contact', value: '+91-9876543210'},
      {label: 'GSTIN', value: '07AAAAA0000A1Z5'},
      {label: 'Status', value: 'Active'}
    ]
  },
  'vendor/documents': {
    title: 'KYC Documents', subtitle: 'Upload and manage compliance proofs.',
    table: {
      columns: ['Document Type', 'Status', 'Uploaded On', 'Remarks', 'Action'],
      rows: [
        {'Document Type': 'PAN Card', 'Status': 'Badge:Approved', 'Uploaded On': '10 Jun 2026', 'Remarks': '-', 'Action': 'View'},
        {'Document Type': 'GST Certificate', 'Status': 'Badge:Approved', 'Uploaded On': '10 Jun 2026', 'Remarks': '-', 'Action': 'View'}
      ]
    }
  },
  'vendor/subscription': {
    title: 'Subscription Details', subtitle: 'Manage your platform access plan.',
    metrics: [{label: 'Current Plan', value: 'Free First Year'}, {label: 'Days Remaining', value: '84'}, {label: 'Status', value: 'Active'}],
    tabs: ['Overview', 'Invoices', 'Renewal Options']
  },
  'vendor/products': {
    title: 'My Catalog', subtitle: 'Manage your active and pending products.',
    table: {
      columns: ['Product', 'Price', 'Stock', 'Status', 'Return Policy', 'Action'],
      rows: [
        {'Product': 'Cotton T-Shirt', 'Price': '₹499', 'Stock': '120', 'Status': 'Badge:Active', 'Return Policy': '7 Days', 'Action': 'Edit'},
        {'Product': 'Denim Jeans', 'Price': '₹999', 'Stock': '50', 'Status': 'Badge:Pending Approval', 'Return Policy': '7 Days', 'Action': 'Edit'}
      ]
    }
  },
  'vendor/products/new': {
    title: 'Add New Product', subtitle: 'Create a product manually.',
    tabs: ['Basic Info', 'Images', 'Pricing & Stock', 'Variants', 'Legal Metrology']
  },
  'vendor/products/import': {
    title: 'CSV Import', subtitle: 'Bulk upload via Amazon/Flipkart/Shopify format.',
    tabs: ['Upload CSV', 'Column Mapping', 'Preview & Fix Errors', 'Import Log']
  },
  'vendor/orders': {
    title: 'My Orders', subtitle: 'Process incoming orders and print slips.',
    table: {
      columns: ['Order ID', 'Product', 'Qty', 'Status', 'SLA', 'Action'],
      rows: [
        {'Order ID': 'ORD-V-001', 'Product': 'Cotton T-Shirt', 'Qty': '2', 'Status': 'Badge:New', 'SLA': '12 hours left', 'Action': 'Accept'},
        {'Order ID': 'ORD-V-002', 'Product': 'Denim Jacket', 'Qty': '1', 'Status': 'Badge:Ready for Pickup', 'SLA': 'On Time', 'Action': 'Print Slip'}
      ]
    }
  },
  'vendor/returns': {
    title: 'Returns Management', subtitle: 'Track reverse pickups returning to you.',
    table: {
      columns: ['Return ID', 'Order ID', 'Product', 'Reason', 'Status', 'Action'],
      rows: [
        {'Return ID': 'RET-01', 'Order ID': 'ORD-V-005', 'Product': 'T-Shirt', 'Reason': 'Size issue', 'Status': 'Badge:In Transit to Vendor', 'Action': 'Track'}
      ]
    }
  },
  'vendor/payouts': {
    title: 'Payouts & Settlements', subtitle: 'View your payments from the platform.',
    table: {
      columns: ['Settlement ID', 'Cycle', 'Total Sales', 'Deductions', 'Net Payout', 'Status'],
      rows: [
        {'Settlement ID': 'STL-01', 'Cycle': '01-07 Jun 2026', 'Total Sales': '₹12,500', 'Deductions': '₹0', 'Net Payout': '₹12,500', 'Status': 'Badge:Paid'}
      ]
    }
  },
  'vendor/reports': {
    title: 'Sales & Reports', subtitle: 'Performance analytics.',
    tabs: ['Sales Overview', 'Product Performance', 'Cancellation Rate']
  },
  'vendor/support': {
    title: 'Help & Support', subtitle: 'Raise tickets to the platform team.',
    tabs: ['My Tickets', 'Create Ticket', 'Account Manager Info']
  },
  'vendor/rating': {
    title: 'Rating & Performance', subtitle: 'Understand your 4.8 / 5.0 score.',
    detailView: [
      {label: 'On-time Dispatch', value: '98%'},
      {label: 'Cancellation Rate', value: '1%'},
      {label: 'Return Rate', value: '2%'},
      {label: 'Customer Reviews', value: '4.6 Avg'}
    ]
  }
};

Object.keys(pageConfigs).forEach(route => {
  const p = path.join(appDir, route, 'page.tsx');
  if (fs.existsSync(p)) {
    fs.writeFileSync(p, generatePage(pageConfigs[route]));
    console.log('Generated:', route);
  }
});
