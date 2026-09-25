import type { ProfessionalPublicData } from '@/features/professionals/types/professional-types';
import type { ServicePublicData } from '@/features/services';

export interface TenantSettings {
  maxAdvancedDays: number;
  requireConfirmation: boolean;
  timeZone: string;
  currency: string;
}

export interface TenantPublicData {
  id: string;
  name: string;
  description: string | null;
  phoneNumber: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  settings: TenantSettings | null;
  professionals: ProfessionalPublicData[];
  services: ServicePublicData[];
}

export type TenantContextData = Omit<
  TenantPublicData,
  'professionals' | 'services'
>;
