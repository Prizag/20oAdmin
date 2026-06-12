export const usersRolesService = {
  getAll: async () => {
    console.log('Mock API call to get all usersRoles');
    return [];
  },
  getById: async (id: string) => {
    console.log(`Mock API call to get usersRoles by id: ${id}`);
    return null;
  },
  create: async (data: any) => {
    console.log('Mock API call to create usersRoles', data);
    return { success: true };
  },
  update: async (id: string, data: any) => {
    console.log(`Mock API call to update usersRoles ${id}`, data);
    return { success: true };
  },
  delete: async (id: string) => {
    console.log(`Mock API call to delete usersRoles ${id}`);
    return { success: true };
  }
};
