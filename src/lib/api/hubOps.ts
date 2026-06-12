export const hubOpsService = {
  getAll: async () => {
    console.log('Mock API call to get all hubOps');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get hubOps by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create hubOps', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update hubOps ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete hubOps ${id}`);
    return { success: true };
  }
};
