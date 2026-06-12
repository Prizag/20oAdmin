export const cmsService = {
  getAll: async () => {
    console.log('Mock API call to get all cms');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get cms by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create cms', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update cms ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete cms ${id}`);
    return { success: true };
  }
};
