import { useQuery } from '@tanstack/react-query';
import { getProfessionalAvailabilitySlots } from '@/api/availability';
import type { UseProfessionalAvailabilitySlotsParams } from '@/features/availability';

export const useProfessionalAvailabilitySlots = ({
  tenantId,
  professionalId,
  serviceId,
  date,
}: UseProfessionalAvailabilitySlotsParams) => {
  return useQuery({
    queryKey: [
      'professional-availability',
      tenantId,
      professionalId,
      serviceId,
      date,
    ],
    queryFn: ({ signal }) =>
      getProfessionalAvailabilitySlots({
        tenantId: tenantId!,
        professionalId: professionalId!,
        serviceId: serviceId!,
        date: date!,
        signal,
      }),

    enabled: Boolean(professionalId && serviceId && date),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
