export const financeService = {
  getAll: async () => {
    console.log('Mock API call to get all finance');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get finance by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create finance', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update finance ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete finance ${id}`);
    return { success: true };
  }
};
