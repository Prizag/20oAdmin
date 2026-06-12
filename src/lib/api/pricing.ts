export const pricingService = {
  getAll: async () => {
    console.log('Mock API call to get all pricing');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get pricing by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create pricing', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update pricing ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete pricing ${id}`);
    return { success: true };
  }
};
