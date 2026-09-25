import type {
  GetProfessionalAvailabilitySlotsParams,
  ProfessionalAvailabilityResponse,
} from '@/features/availability';
import { api } from './client';

export const getProfessionalAvailabilitySlots = async ({
  tenantId,
  professionalId,
  serviceId,
  date,
  signal,
}: GetProfessionalAvailabilitySlotsParams): Promise<ProfessionalAvailabilityResponse> => {
  const response = await api.get<ProfessionalAvailabilityResponse>(
    `/availability/slots`,
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
};

export interface GetProfessionalAvailabilityOverviewParams {
  tenantId: string;
  professionalId: string;
  serviceId: string;
  startDate: string;
  signal?: AbortSignal;
}

export interface GetProfessionalAvailabilityOverviewResponse {
  timeZone: string;
  days: Record<
    string,
    { date: string; status: string; availableCount: number }
  >;
}

export const getProfessionalAvailabilityOverview = async ({
  tenantId,
  professionalId,
  serviceId,
  startDate,
  signal,
}: GetProfessionalAvailabilityOverviewParams): Promise<GetProfessionalAvailabilityOverviewResponse> => {
  const response = await api.get<GetProfessionalAvailabilityOverviewResponse>(
    `/availability/overview`,
    {
      params: {
        tenantId,
        professionalId,
        serviceId,
        startDate,
      },
      signal,
    }
  );

  return response.data;
};
