import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getServicesByProfessional } from '@/api/services';
import type { TenantService } from '@/types/tenant';

export function useServicesByProfessional(
  professionalId?: string
): UseQueryResult<TenantService[], Error> {
  return useQuery({
    queryKey: ['services', 'professional', professionalId],
    queryFn: () => getServicesByProfessional(professionalId!),
    enabled: Boolean(professionalId),
  });
}
