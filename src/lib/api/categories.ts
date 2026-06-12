export const categoriesService = {
  getAll: async () => {
    console.log('Mock API call to get all categories');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get categories by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create categories', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update categories ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete categories ${id}`);
    return { success: true };
  }
};
