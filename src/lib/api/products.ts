export const productsService = {
  getAll: async () => {
    console.log('Mock API call to get all products');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get products by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create products', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update products ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete products ${id}`);
    return { success: true };
  }
};
