export const vendorDashboardMetrics = {
  activeProducts: 45,
  pendingApprovals: 3,
  ordersToPrepare: 12,
  pickupPending: 5,
  stockAlerts: 2,
  subscriptionDaysLeft: 84,
  rating: 4.8,
  totalSales: 450000,
  thisMonthSales: 56000,
  returnRate: 2.1,
};

export const vendorRecentOrders = [
  { id: 'ORD-V-001', product: 'Cotton T-Shirt Mens', qty: 2, amount: 998, status: 'New', date: '2026-06-12', sla: '12 hours left' },
  { id: 'ORD-V-002', product: 'Denim Jacket', qty: 1, amount: 2499, status: 'Ready for Pickup', date: '2026-06-11', sla: 'On Time' },
  { id: 'ORD-V-003', product: 'Formal Trousers', qty: 3, amount: 4500, status: 'Picked Up', date: '2026-06-10', sla: 'On Time' },
  { id: 'ORD-V-004', product: 'Polo Neck T-Shirt', qty: 1, amount: 599, status: 'Delivered', date: '2026-06-08', sla: 'On Time' },
];

export const vendorAlerts = [
  { id: 1, type: 'warning', message: '2 products are running low on stock (< 5 units).' },
  { id: 2, type: 'info', message: 'New order ORD-V-001 needs to be accepted before SLA breach.' },
];

export const vendorSalesData = [
  { name: 'Week 1', sales: 12000 },
  { name: 'Week 2', sales: 15000 },
  { name: 'Week 3', sales: 11000 },
  { name: 'Week 4', sales: 18000 },
];
