import { api } from './client';
import type { TenantPublicData } from '@/types/tenant';

export const getTenantBySlug = async (
  slug: string
): Promise<TenantPublicData> => {
  const response = await api.get<TenantPublicData>(`/tenants/${slug}`);

  return response.data;
};
