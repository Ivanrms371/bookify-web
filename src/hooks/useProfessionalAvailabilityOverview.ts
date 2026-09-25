import { useQuery } from '@tanstack/react-query';
import {
  getProfessionalAvailabilityOverview,
  type GetProfessionalAvailabilityOverviewParams,
} from '@/api/availability';

export const useProfessionalAvailabilityOverview = ({
  tenantId,
  professionalId,
  serviceId,
  startDate,
}: GetProfessionalAvailabilityOverviewParams) => {
  return useQuery({
    queryKey: [
      'professional-availability',
      tenantId,
      professionalId,
      serviceId,
      startDate,
    ],
    queryFn: ({ signal }) =>
      getProfessionalAvailabilityOverview({
        tenantId,
        professionalId,
        serviceId,
        startDate,
        signal,
      }),
    enabled: Boolean(tenantId && professionalId && serviceId && startDate),
    staleTime: 1000 * 60 * 2, // 2 minutos en caché
  });
};
