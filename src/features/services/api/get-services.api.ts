import { api } from '@/shared/api/client';
import type { TenantService } from '@/shared/types/tenant';
import { useQuery } from '@tanstack/react-query';

export const getServices = async (
  tenantId: string
): Promise<TenantService[]> => {
  const response = await api.get<TenantService[]>(
    `/tenants/${tenantId}/services`
  );

  return response.data;
};

export const useServices = (tenantId?: string) => {
  return useQuery({
    queryKey: ['services', tenantId],
    queryFn: () => getServices(tenantId!),
    enabled: !!tenantId,
  });
};
