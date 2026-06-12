export const reviewsService = {
  getAll: async () => {
    console.log('Mock API call to get all reviews');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get reviews by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create reviews', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update reviews ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete reviews ${id}`);
    return { success: true };
  }
};
