import { api } from '@/api/client';
import type {
  CheckSlotAvailabilityParams,
  CheckSlotAvailabilityResponse,
  GetProfessionalAvailabilityOverviewParams,
  GetProfessionalAvailabilityOverviewResponse,
  GetProfessionalAvailabilitySlotsParams,
  ProfessionalAvailabilityResponse,
} from '../types/availability-types';

export const availabilityApi = {
  getProfessionalAvailabilitySlots: async ({
    tenantId,
    professionalId,
    serviceId,
    date,
    signal,
  }: GetProfessionalAvailabilitySlotsParams): Promise<ProfessionalAvailabilityResponse> => {
    const response = await api.get<ProfessionalAvailabilityResponse>(
      '/availability/slots',
      {
        params: {
          tenantId,
          professionalId,
          serviceId,
          date,
        },
        signal,
      }
    );
    return response.data;
  },

  checkSlotAvailability: async ({
    tenantId,
    professionalId,
    serviceId,
    startsAt,
    signal,
  }: CheckSlotAvailabilityParams): Promise<CheckSlotAvailabilityResponse> => {
    const response = await api.get<CheckSlotAvailabilityResponse>(
      '/availability/validate',
      {
        params: {
          tenantId,
          professionalId,
          serviceId,
          startsAt,
        },
        signal,
      }
    );
    return response.data;
  },

  getProfessionalAvailabilityOverview: async ({
    tenantId,
    professionalId,
    serviceId,
    startDate,
    endDate,
    signal,
  }: GetProfessionalAvailabilityOverviewParams): Promise<GetProfessionalAvailabilityOverviewResponse> => {
    const response = await api.get<GetProfessionalAvailabilityOverviewResponse>(
      '/availability/overview',
      {
        params: {
          tenantId,
          professionalId,
          serviceId,
          startDate,
          ...(endDate ? { endDate } : {}),
        },
        signal,
      }
    );
    return response.data;
  },
};

export const availabilityService = availabilityApi;
