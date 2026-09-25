import { api } from '@/shared/api/client';
import type { TenantService } from '@/shared/types/tenant';
import { useQuery } from '@tanstack/react-query';

export const getServicesByProfessional = async (
  professionalId: string
): Promise<TenantService[]> => {
  const response = await api.get<TenantService[]>(
    `/professionals/${professionalId}/services`
  );

  return response.data;
};

export const useServicesByProfessional = (professionalId?: string) => {
  return useQuery({
    queryKey: ['services-by-professional', professionalId],
    queryFn: () => getServicesByProfessional(professionalId!),
    enabled: !!professionalId,
  });
};
