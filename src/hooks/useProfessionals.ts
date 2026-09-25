import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getProfessionals } from '@/api/professionals';
import type { TenantProfessional } from '@/types/tenant';

export function useProfessionals(
  tenantId?: string
): UseQueryResult<TenantProfessional[], Error> {
  return useQuery({
    queryKey: ['professionals', tenantId],
    queryFn: () => getProfessionals(tenantId!),
    enabled: Boolean(tenantId),
  });
}
