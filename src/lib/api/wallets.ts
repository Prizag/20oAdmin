export const walletsService = {
  getAll: async () => {
    console.log('Mock API call to get all wallets');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get wallets by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create wallets', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update wallets ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete wallets ${id}`);
    return { success: true };
  }
};
