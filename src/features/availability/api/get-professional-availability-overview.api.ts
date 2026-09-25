import { api } from '@/shared/api/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { GetProfessionalAvailabilityOverviewParams, GetProfessionalAvailabilityOverviewResponse } from '../types/availability-types';

export const getProfessionalAvailabilityOverview = async ({ tenantId, professionalId, serviceId, startDate, endDate, signal }: GetProfessionalAvailabilityOverviewParams): Promise<GetProfessionalAvailabilityOverviewResponse> => {
  const response = await api.get<GetProfessionalAvailabilityOverviewResponse>('/availability/overview', {
    params: { tenantId, professionalId, serviceId, startDate, ...(endDate ? { endDate } : {}) },
    signal,
  });
  return response.data;
};

export function useProfessionalAvailabilityOverview({ tenantId, professionalId, serviceId, startDate, endDate, enabled = true }: GetProfessionalAvailabilityOverviewParams & { enabled?: boolean }): UseQueryResult<GetProfessionalAvailabilityOverviewResponse, Error> {
  const isEnabled = Boolean(tenantId && professionalId && serviceId && startDate && enabled);

  return useQuery({
    queryKey: ['availability', 'overview', tenantId, professionalId, serviceId, startDate, endDate],
    queryFn: ({ signal }) => getProfessionalAvailabilityOverview({ tenantId, professionalId, serviceId, startDate, endDate, signal }),
    enabled: isEnabled,
  });
}
