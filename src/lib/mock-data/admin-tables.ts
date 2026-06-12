export const adminProductsMock = [
  {
    id: 'PRD-C-001',
    title: 'Wireless Earbuds TWS-200',
    source: 'China Product Feed',
    status: 'Active',
    price: 1299,
    stock: 450,
    compliance: 'Warning',
    variants: 2,
  },
  {
    id: 'PRD-V-002',
    title: 'Cotton Printed T-Shirt',
    source: 'Indian Vendor',
    status: 'Pending Approval',
    price: 499,
    stock: 120,
    compliance: 'Clear',
    variants: 4,
  },
  {
    id: 'PRD-M-003',
    title: '20o Branded Packaging Box',
    source: 'Manual Admin Product',
    status: 'Active',
    price: 50,
    stock: 5000,
    compliance: 'Clear',
    variants: 1,
  }
];

export const adminOrdersMock = [
  {
    id: 'ORD-2026-9001',
    customer: 'Rahul Sharma',
    phone: '+91-9876543210',
    total: 4500,
    paymentMode: 'Prepaid',
    status: 'Processing',
    date: '2026-06-12',
    fulfillmentGroups: [
      { id: 'FG-C-1', source: 'China', status: 'China Purchase Completed' },
      { id: 'FG-V-1', source: 'Indian Vendor (Vendor A)', status: 'Ready for Pickup' }
    ]
  },
  {
    id: 'ORD-2026-9002',
    customer: 'Priya Singh',
    phone: '+91-9876543211',
    total: 1299,
    paymentMode: 'COD',
    status: 'Delivered',
    date: '2026-06-11',
    fulfillmentGroups: [
      { id: 'FG-V-2', source: 'Indian Vendor (Vendor B)', status: 'Delivered' }
    ]
  }
];

export const feedUpdatesMock = [
  {
    id: 'FU-001',
    productName: 'Smart Watch X Pro',
    field: 'Price',
    currentValue: '¥120.00',
    newValue: '¥135.00',
    status: 'Pending',
    date: '2026-06-12',
    isProtected: true
  },
  {
    id: 'FU-002',
    productName: 'LED Desk Lamp',
    field: 'Stock',
    currentValue: 'In Stock',
    newValue: 'Out of Stock',
    status: 'Pending',
    date: '2026-06-12',
    isProtected: false
  }
];
