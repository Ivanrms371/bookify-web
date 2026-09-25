export interface TenantSettings {
  maxAdvancedDays: number;
  requireConfirmation: boolean;
  timeZone: string;
  currency: string;
}

export interface TenantProfessional {
  id: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface TenantService {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  durationMinutes: number;
  price: string;
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
  professionals: TenantProfessional[];
  services: TenantService[];
}

export type TenantContextData = Omit<
  TenantPublicData,
  'professionals' | 'services'
>;
