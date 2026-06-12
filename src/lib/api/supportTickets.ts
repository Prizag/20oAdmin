export const supportTicketsService = {
  getAll: async () => {
    console.log('Mock API call to get all supportTickets');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get supportTickets by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create supportTickets', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update supportTickets ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete supportTickets ${id}`);
    return { success: true };
  }
};
