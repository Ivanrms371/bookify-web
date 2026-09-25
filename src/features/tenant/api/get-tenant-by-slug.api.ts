import { api } from '@/shared/api/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TenantPublicData } from '../types/tenant-types';

export const getTenantBySlug = async (slug: string): Promise<TenantPublicData> => {
  const response = await api.get<TenantPublicData>(`/tenants/${slug}`);
  return response.data;
};

export function useTenantBySlug(slug?: string): UseQueryResult<TenantPublicData, Error> {
  return useQuery({
    queryKey: ['tenant', slug],
    queryFn: () => getTenantBySlug(slug!),
    enabled: Boolean(slug),
  });
}
