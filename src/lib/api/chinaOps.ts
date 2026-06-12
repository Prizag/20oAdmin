export const chinaOpsService = {
  getAll: async () => {
    console.log('Mock API call to get all chinaOps');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get chinaOps by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create chinaOps', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update chinaOps ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete chinaOps ${id}`);
    return { success: true };
  }
};
