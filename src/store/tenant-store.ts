// src/stores/tenant-store.ts
import { create } from 'zustand';
import type { TenantContextData } from '@/types/tenant';

interface TenantState {
  tenant: TenantContextData | null;
  setTenant: (tenant: TenantContextData) => void;
  clearTenant: () => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenant: null,
  setTenant: (tenant) => set({ tenant }),
  clearTenant: () => set({ tenant: null }),
}));
