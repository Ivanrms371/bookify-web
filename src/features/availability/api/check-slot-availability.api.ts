import { api } from '@/shared/api/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { CheckSlotAvailabilityParams, CheckSlotAvailabilityResponse } from '../types/availability-types';

export const checkSlotAvailability = async ({ tenantId, professionalId, serviceId, startsAt, signal }: CheckSlotAvailabilityParams): Promise<CheckSlotAvailabilityResponse> => {
  const response = await api.get<CheckSlotAvailabilityResponse>('/availability/validate', {
    params: { tenantId, professionalId, serviceId, startsAt },
    signal,
  });
  return response.data;
};

export function useCheckSlotAvailability({ tenantId, professionalId, serviceId, startsAt, enabled = true }: CheckSlotAvailabilityParams & { enabled?: boolean }): UseQueryResult<CheckSlotAvailabilityResponse, Error> {
  const isEnabled = Boolean(tenantId && professionalId && serviceId && startsAt && enabled);

  return useQuery({
    queryKey: ['availability', 'check', tenantId, professionalId, serviceId, startsAt],
    queryFn: ({ signal }) => checkSlotAvailability({ tenantId, professionalId, serviceId, startsAt, signal }),
    enabled: isEnabled,
    retry: false,
  });
}
