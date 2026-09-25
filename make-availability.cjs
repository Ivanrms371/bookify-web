const fs = require('fs');

const overviewHook = fs.readFileSync('src/features/availability/hooks/use-professional-availability-overview.ts', 'utf8');
const slotsHook = fs.readFileSync('src/features/availability/hooks/use-professional-availability-slots.ts', 'utf8');
const checkHook = fs.readFileSync('src/features/availability/hooks/use-check-availability.ts', 'utf8');

const overviewContent = `import { api } from '@/shared/api/client';
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
`;

const slotsContent = `import { api } from '@/shared/api/client';
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
`;

const checkContent = `import { api } from '@/shared/api/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { CheckSlotAvailabilityParams, CheckSlotAvailabilityResponse } from '../types/availability-types';

export const checkSlotAvailability = async ({ tenantId, professionalId, serviceId, startsAt, signal }: CheckSlotAvailabilityParams): Promise<CheckSlotAvailabilityResponse> => {
  const response = await api.get<CheckSlotAvailabilityResponse>('/availability/validate', {
    params: { tenantId, professionalId, serviceId, startsAt },
    signal,
  });
  return response.data;
};

export function useCheckAvailability({ tenantId, professionalId, serviceId, startsAt, enabled = true }: CheckSlotAvailabilityParams & { enabled?: boolean }): UseQueryResult<CheckSlotAvailabilityResponse, Error> {
  const isEnabled = Boolean(tenantId && professionalId && serviceId && startsAt && enabled);

  return useQuery({
    queryKey: ['availability', 'check', tenantId, professionalId, serviceId, startsAt],
    queryFn: ({ signal }) => checkSlotAvailability({ tenantId, professionalId, serviceId, startsAt, signal }),
    enabled: isEnabled,
    retry: false,
  });
}
`;

fs.writeFileSync('src/features/availability/api/get-professional-availability-overview.api.ts', overviewContent);
fs.writeFileSync('src/features/availability/api/get-professional-availability-slots.api.ts', slotsContent);
fs.writeFileSync('src/features/availability/api/check-slot-availability.api.ts', checkContent);
