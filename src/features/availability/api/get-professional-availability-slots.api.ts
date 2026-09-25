import { api } from '@/shared/api/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { GetProfessionalAvailabilitySlotsParams, ProfessionalAvailabilityResponse } from '../types/availability-types';

export const getProfessionalAvailabilitySlots = async ({ tenantId, professionalId, serviceId, date, signal }: GetProfessionalAvailabilitySlotsParams): Promise<ProfessionalAvailabilityResponse> => {
  const response = await api.get<ProfessionalAvailabilityResponse>('/availability/slots', {
    params: { tenantId, professionalId, serviceId, date },
    signal,
  });
  return response.data;
};

export function useProfessionalAvailabilitySlots({ tenantId, professionalId, serviceId, date, enabled = true }: GetProfessionalAvailabilitySlotsParams & { enabled?: boolean }): UseQueryResult<ProfessionalAvailabilityResponse, Error> {
  const isEnabled = Boolean(tenantId && professionalId && serviceId && date && enabled);

  return useQuery({
    queryKey: ['availability', 'slots', tenantId, professionalId, serviceId, date],
    queryFn: async ({ signal }) => getProfessionalAvailabilitySlots({ tenantId, professionalId, serviceId, date, signal }),
    enabled: isEnabled,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}
