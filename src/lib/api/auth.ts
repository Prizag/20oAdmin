export const authService = {
  getAll: async () => {
    console.log('Mock API call to get all auth');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get auth by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create auth', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update auth ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete auth ${id}`);
    return { success: true };
  }
};
