export const productFeedService = {
  getAll: async () => {
    console.log('Mock API call to get all productFeed');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get productFeed by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create productFeed', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update productFeed ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete productFeed ${id}`);
    return { success: true };
  }
};
