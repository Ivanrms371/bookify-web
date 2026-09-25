import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getProfessionalsByService } from '@/api/professionals';
import type { TenantProfessional } from '@/types/tenant';

export function useProfessionalsByService(
  serviceId?: string
): UseQueryResult<TenantProfessional[], Error> {
  return useQuery({
    queryKey: ['professionals', 'service', serviceId],
    queryFn: () => getProfessionalsByService(serviceId!),
    enabled: Boolean(serviceId),
  });
}
