export const exchangeRatesService = {
  getAll: async () => {
    console.log('Mock API call to get all exchangeRates');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get exchangeRates by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create exchangeRates', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update exchangeRates ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete exchangeRates ${id}`);
    return { success: true };
  }
};
