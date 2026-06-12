export const ordersService = {
  getAll: async () => {
    console.log('Mock API call to get all orders');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get orders by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create orders', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update orders ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete orders ${id}`);
    return { success: true };
  }
};
