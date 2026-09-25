export interface Slot {
  time: string;
  startsAt: string;
  endsAt: string;
}

export interface GetProfessionalAvailabilitySlotsParams {
  tenantId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  signal?: AbortSignal;
}

export interface ProfessionalAvailabilityResponse {
  date: string;
  isAvailable?: boolean;
  reason?: string;
  slots: Slot[];
  nextAvailable?: {
    date: string;
    slots: Slot[];
  } | null;
}

export type DayOverviewStatus = 'AVAILABLE' | 'SATURATED' | 'EMPTY' | 'CLOSED';

export interface DayOverviewItem {
  date: string;
  status: DayOverviewStatus | string;
  availableCount: number;
  reason?: string;
}

export interface GetProfessionalAvailabilityOverviewParams {
  tenantId: string;
  professionalId: string;
  serviceId: string;
  startDate: string;
  endDate?: string;
  signal?: AbortSignal;
}

export interface GetProfessionalAvailabilityOverviewResponse {
  timeZone: string;
  days: Record<string, DayOverviewItem>;
}

export interface CheckSlotAvailabilityParams {
  tenantId: string;
  professionalId: string;
  serviceId: string;
  startsAt: string;
  signal?: AbortSignal;
}

export interface CheckSlotAvailabilityResponse {
  available: boolean;
}

export interface UseProfessionalAvailabilitySlotsParams {
  tenantId?: string | null;
  professionalId?: string | null;
  serviceId?: string | null;
  date?: string | null;
  enabled?: boolean;
}

export interface UseProfessionalAvailabilityOverviewParams {
  tenantId?: string | null;
  professionalId?: string | null;
  serviceId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  enabled?: boolean;
}

export interface UseCheckAvailabilityParams {
  tenantId: string;
  professionalId: string;
  serviceId: string;
  startsAt: string;
  enabled?: boolean;
}
