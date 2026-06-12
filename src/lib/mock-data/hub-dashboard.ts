export const hubDashboardMetrics = {
  inboundCartonsExpected: 12,
  cartonsReceivedToday: 8,
  packagesToSplit: 45,
  localLabelsToPrint: 38,
  handedOverToday: 120,
  slaBreached: 2,
};

export const hubInboundCartons = [
  { id: 'CRT-2606-001', from: 'China Team', expectedItems: 45, status: 'In Transit', eta: '2 hours' },
  { id: 'CRT-2606-003', from: 'China Team', expectedItems: 12, status: 'Received (QC Pending)', eta: 'Arrived' },
];

export const hubLocalDispatch = [
  { orderId: 'ORD-2026-002', destination: 'Delhi - 110001', courier: 'Delhivery', status: 'Label Printed', due: '1h' },
  { orderId: 'ORD-2026-004', destination: 'Mumbai - 400001', courier: 'BlueDart', status: 'Packing', due: '2h' },
  { orderId: 'ORD-2026-008', destination: 'Bangalore - 560001', courier: 'Unassigned', status: 'Sorting', due: '3h' },
];

export const hubExceptions = [
  { type: 'Missing Item', ref: 'CRT-2606-003', desc: 'Expected 12 items, found 11. Missing SKU: TWS-200.' },
  { type: 'Courier Delay', ref: 'Delhivery', desc: 'Pickup vehicle delayed by 2 hours due to rain.' },
];
