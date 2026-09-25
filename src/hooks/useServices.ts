import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getServices } from '@/api/services';
import type { TenantService } from '@/types/tenant';

export function useServices(
  tenantId?: string
): UseQueryResult<TenantService[], Error> {
  return useQuery({
    queryKey: ['services', tenantId],
    queryFn: () => getServices(tenantId!),
    enabled: Boolean(tenantId),
  });
}
