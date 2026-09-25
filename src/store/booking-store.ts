import { create } from 'zustand';
import type { TenantService, TenantProfessional } from '@/types/tenant';
import type { CustomerData } from '@/types/customer';
import type { Slot } from '@/api/availability';

export interface BookingState {
  step: number;
  selectedService: TenantService | null;
  selectedProfessional: TenantProfessional | null;
  selectedDate: string | null;
  selectedTime: Slot | null;
  customerData: CustomerData;
}

export interface BookingActions {
  setStep: (step: number) => void;
  canGoToStep: (step: number) => boolean;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedService: (service: TenantService | null) => void;
  setSelectedProfessional: (professional: TenantProfessional | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: Slot | null) => void;
  setSelectedDateTime: (date: string | null, time: Slot | null) => void;
  setCustomerData: (data: Partial<CustomerData>) => void;
  resetBooking: () => void;
}

export type BookingStore = BookingState & BookingActions;

const initialCustomerData: CustomerData = {
  name: '',
  email: '',
  phoneNumber: '',
  phoneCodeNumber: '',
};

const initialState: BookingState = {
  step: 1,
  selectedService: null,
  selectedProfessional: null,
  selectedDate: null,
  selectedTime: null,
  customerData: initialCustomerData,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,

  setStep: (step: number): void => {
    if (!get().canGoToStep(step)) return;

    set({ step });
  },

  canGoToStep: (step: number): boolean => {
    if (step === 1) return true;
    if (step === 2) return !!get().selectedService;

    if (step === 3) {
      return !!get().selectedProfessional && !!get().selectedService;
    }

    if (step === 4) {
      return (
        !!get().selectedProfessional &&
        !!get().selectedService &&
        !!get().selectedDate &&
        !!get().selectedTime
      );
    }

    return false;
  },

  nextStep: (): void => {
    const { step, setStep } = get();
    setStep(step + 1);
  },

  prevStep: (): void => {
    const { step, setStep } = get();
    setStep(step - 1);
  },

  setSelectedService: (selectedService): void => {
    set({ selectedService });
  },

  setSelectedProfessional: (selectedProfessional): void => {
    set({ selectedProfessional });
  },

  setSelectedDate: (selectedDate): void => {
    set({ selectedDate });
  },

  setSelectedTime: (selectedTime): void => {
    set({ selectedTime });
  },

  setSelectedDateTime: (selectedDate, selectedTime): void => {
    set({ selectedDate, selectedTime });
  },

  setCustomerData: (data: Partial<CustomerData>): void => {
    set((state) => ({
      customerData: {
        ...state.customerData,
        ...data,
      },
    }));
  },

  resetBooking: (): void => {
    set(initialState);
  },
}));
