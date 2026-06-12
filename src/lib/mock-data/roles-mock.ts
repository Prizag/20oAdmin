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
