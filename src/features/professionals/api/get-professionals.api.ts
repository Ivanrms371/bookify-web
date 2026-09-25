import { api } from '@/shared/api/client';
import type { TenantService } from '@/shared/types/tenant';
import { useQuery } from '@tanstack/react-query';

export const getProfessionals = async (
  tenantId: string
): Promise<TenantService[]> => {
  const response = await api.get<TenantService[]>(
    `/tenants/${tenantId}/professionals`
  );

  return response.data;
};

export const useProfessionals = (tenantId?: string) => {
  return useQuery({
    queryKey: ['professionals', tenantId],
    queryFn: () => getProfessionals(tenantId!),
    enabled: !!tenantId,
  });
};
