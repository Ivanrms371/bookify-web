import { api } from '@/shared/api/client';
import type { TenantProfessional } from '@/shared/types/tenant';
import { useQuery } from '@tanstack/react-query';

export const getProfessionalsByService = async (
  serviceId: string
): Promise<TenantProfessional[]> => {
  const response = await api.get<TenantProfessional[]>(
    `/services/${serviceId}/professionals`
  );

  return response.data;
};

export const useProfessionalsByService = (serviceId?: string) => {
  return useQuery({
    queryKey: ['professionals-by-service', serviceId],
    queryFn: () => getProfessionalsByService(serviceId!),
    enabled: !!serviceId,
  });
};
