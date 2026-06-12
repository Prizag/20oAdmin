export const dashboardMetrics = {
  totalGMV: 1250000,
  netRevenue: 980000,
  grossMargin: 25,
  orderCount: 1450,
  prepaidOrders: 1100,
  codOrders: 200,
  bnplOrders: 150,
  pendingVendorApprovals: 12,
  pendingProductApprovals: 45,
  chinaPurchaseQueue: 89,
  delayedChinaOrders: 5,
  indiaHubPendingDispatch: 120,
  courierExceptions: 3,
};

export const sourcePerformance = [
  { name: 'China Feed', gmv: 850000, margin: 28, refunds: 2, avgDelivery: 12 },
  { name: 'Indian Vendors', gmv: 400000, margin: 22, refunds: 5, avgDelivery: 4 },
];

export const salesData = [
  { name: 'Mon', china: 4000, india: 2400 },
  { name: 'Tue', china: 3000, india: 1398 },
  { name: 'Wed', china: 2000, india: 9800 },
  { name: 'Thu', china: 2780, india: 3908 },
  { name: 'Fri', china: 1890, india: 4800 },
  { name: 'Sat', china: 2390, india: 3800 },
  { name: 'Sun', china: 3490, india: 4300 },
];

export const recentOrders = [
  { id: 'ORD-2026-001', customer: 'Rahul Sharma', source: 'Mixed Cart', amount: 4500, status: 'Paid / Awaiting China Team', date: '2026-06-12' },
  { id: 'ORD-2026-002', customer: 'Priya Singh', source: 'China Feed', amount: 1200, status: 'Shipped from China', date: '2026-06-11' },
  { id: 'ORD-2026-003', customer: 'Amit Kumar', source: 'Indian Vendor', amount: 3400, status: 'Out for Delivery', date: '2026-06-10' },
  { id: 'ORD-2026-004', customer: 'Sneha Gupta', source: 'China Feed', amount: 890, status: 'Temporarily Out of Stock', date: '2026-06-10' },
  { id: 'ORD-2026-005', customer: 'Vikram Singh', source: 'Indian Vendor', amount: 5600, status: 'Delivered', date: '2026-06-09' },
];

export const operationalAlerts = [
  { id: 1, type: 'warning', message: '12 products from China Feed had a price increase. Margin drop detected.' },
  { id: 2, type: 'error', message: '5 China Purchase Tasks have breached SLA (>24h pending).' },
  { id: 3, type: 'info', message: '8 Indian Vendor KYC documents pending review.' },
];
