import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getTenantBySlug } from '@/api/tenants';
import type { TenantPublicData } from '@/types/tenant';

export function useTenantBySlug(
  slug?: string
): UseQueryResult<TenantPublicData, Error> {
  return useQuery({
    queryKey: ['tenant', slug],
    queryFn: () => getTenantBySlug(slug!),
    enabled: Boolean(slug),
  });
}
