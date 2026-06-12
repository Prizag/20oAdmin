export const chinaDashboardMetrics = {
  tasksPending: 89,
  availabilityChecksPending: 12,
  purchasesPending: 45,
  qcPending: 32,
  cartonsToShip: 15,
  issuesRaised: 4,
};

export const chinaTaskQueue = [
  { id: 'TSK-C-101', product: 'Wireless Earbuds TWS-200', qty: 5, budget: '¥45.00', priority: 'High', status: 'Availability Check', due: '2h' },
  { id: 'TSK-C-102', product: 'Minimalist Wall Clock', qty: 2, budget: '¥120.00', priority: 'Medium', status: 'Purchase Pending', due: '4h' },
  { id: 'TSK-C-103', product: 'LED Strip Lights 5M', qty: 10, budget: '¥25.00', priority: 'Low', status: 'QC Pending', due: 'Today' },
  { id: 'TSK-C-104', product: 'Silicone Phone Case', qty: 20, budget: '¥5.50', priority: 'Medium', status: 'QC Pending', due: 'Today' },
  { id: 'TSK-C-105', product: 'Ceramic Vase Set', qty: 1, budget: '¥85.00', priority: 'High', status: 'Availability Check', due: '1h' },
];

export const chinaCartons = [
  { id: 'CRT-2606-001', itemsCount: 45, weight: '12.5 kg', dest: 'India Hub - DEL', status: 'Bundling', lastUpdated: '10 mins ago' },
  { id: 'CRT-2606-002', itemsCount: 22, weight: '8.2 kg', dest: 'India Hub - DEL', status: 'Ready to Ship', lastUpdated: '1 hour ago' },
];
