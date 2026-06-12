export const settingsService = {
  getAll: async () => {
    console.log('Mock API call to get all settings');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get settings by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create settings', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update settings ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete settings ${id}`);
    return { success: true };
  }
};
