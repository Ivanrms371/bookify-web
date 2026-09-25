import { api } from '@/api/client';

export const tenantApi = {
  getTenantBySlug: async (slug: string) => {
    const response = await api.get(`/tenants/${slug}`);
    return response.data;
  },
};
