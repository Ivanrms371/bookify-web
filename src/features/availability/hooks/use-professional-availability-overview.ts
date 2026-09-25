import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability-api';
import type {
  GetProfessionalAvailabilityOverviewResponse,
  UseProfessionalAvailabilityOverviewParams,
} from '../types/availability-types';

export function useProfessionalAvailabilityOverview({
  tenantId,
  professionalId,
  serviceId,
  startDate,
  endDate,
  enabled = true,
}: UseProfessionalAvailabilityOverviewParams): UseQueryResult<
  GetProfessionalAvailabilityOverviewResponse,
  Error
> {
  const isEnabled = Boolean(
    tenantId && professionalId && serviceId && startDate && enabled
  );

  return useQuery({
    queryKey: [
      'availability',
      'overview',
      tenantId,
      professionalId,
      serviceId,
      startDate,
      endDate,
    ],
    queryFn: ({
      signal,
    }): Promise<GetProfessionalAvailabilityOverviewResponse> => {
      if (!tenantId || !professionalId || !serviceId || !startDate) {
        throw new Error(
          'Missing required parameters for professional availability overview'
        );
      }

      return availabilityApi.getProfessionalAvailabilityOverview({
        tenantId,
        professionalId,
        serviceId,
        startDate,
        ...(endDate ? { endDate } : {}),
        signal,
      });
    },
    enabled: isEnabled,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });
}
