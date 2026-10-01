import { api } from '@/shared/api/client';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { CheckSlotAvailabilityParams, CheckSlotAvailabilityResponse } from '../types/availability-types';

export const checkSlotAvailability = async ({ tenantId, professionalId, serviceId, startsAt, signal }: CheckSlotAvailabilityParams): Promise<CheckSlotAvailabilityResponse> => {
  const response = await api.get<CheckSlotAvailabilityResponse>('/availability/validate', {
    params: { tenantId, professionalId, serviceId, startsAt },
    signal,
  });
  return response.data;
};

export function useCheckSlotAvailability(): UseMutationResult<CheckSlotAvailabilityResponse, Error, CheckSlotAvailabilityParams> {
  return useMutation({
    mutationFn: checkSlotAvailability,
    retry: false,
  });
}
