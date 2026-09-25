import { api } from './client';
import type { TenantService } from '@/types/tenant';

export const getServices = async (
  tenantId: string
): Promise<TenantService[]> => {
  const response = await api.get<TenantService[]>(
    `/tenants/${tenantId}/services`
  );

  return response.data;
};

export const getServicesByProfessional = async (
  professionalId: string
): Promise<TenantService[]> => {
  const response = await api.get<TenantService[]>(
    `/professionals/${professionalId}/services`
  );

  return response.data;
};
