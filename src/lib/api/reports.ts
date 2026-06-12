export const reportsService = {
  getAll: async () => {
    console.log('Mock API call to get all reports');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get reports by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create reports', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update reports ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete reports ${id}`);
    return { success: true };
  }
};
