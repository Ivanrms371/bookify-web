import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability-api';
import type {
  ProfessionalAvailabilityResponse,
  UseProfessionalAvailabilitySlotsParams,
} from '../types/availability-types';

export function useProfessionalAvailabilitySlots({
  tenantId,
  professionalId,
  serviceId,
  date,
  enabled = true,
}: UseProfessionalAvailabilitySlotsParams): UseQueryResult<
  ProfessionalAvailabilityResponse,
  Error
> {
  const isEnabled = Boolean(
    tenantId && professionalId && serviceId && date && enabled
  );

  return useQuery({
    queryKey: [
      'availability',
      'slots',
      tenantId,
      professionalId,
      serviceId,
      date,
    ],
    queryFn: async ({ signal }): Promise<ProfessionalAvailabilityResponse> => {
      if (!tenantId || !professionalId || !serviceId || !date) {
        throw new Error(
          'Missing required parameters for professional availability slots'
        );
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 200);
      });

      return availabilityApi.getProfessionalAvailabilitySlots({
        tenantId,
        professionalId,
        serviceId,
        date,
        signal,
      });
    },
    enabled: isEnabled,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}
