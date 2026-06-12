export const vendorsService = {
  getAll: async () => {
    console.log('Mock API call to get all vendors');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get vendors by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create vendors', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update vendors ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete vendors ${id}`);
    return { success: true };
  }
};
