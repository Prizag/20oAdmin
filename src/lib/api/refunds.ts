export const refundsService = {
  getAll: async () => {
    console.log('Mock API call to get all refunds');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get refunds by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create refunds', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update refunds ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete refunds ${id}`);
    return { success: true };
  }
};
