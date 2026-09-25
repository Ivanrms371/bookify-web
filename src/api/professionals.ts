import { api } from './client';
import type { TenantProfessional } from '@/types/tenant';

export const getProfessionals = async (
  tenantId: string
): Promise<TenantProfessional[]> => {
  const response = await api.get<TenantProfessional[]>(
    `/tenants/${tenantId}/professionals`
  );

  return response.data;
};

export const getProfessionalsByService = async (
  serviceId: string
): Promise<TenantProfessional[]> => {
  const response = await api.get<TenantProfessional[]>(
    `/services/${serviceId}/professionals`
  );

  return response.data;
};
