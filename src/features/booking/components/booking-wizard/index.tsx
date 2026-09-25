import { useRef } from 'react';
import { BookingBreadcrumb } from './BookingBreadcrumb';
import { SelectServiceStep } from './steps/SelectServiceStep';
import { SelectProfessionalStep } from './steps/SelectProfessionalStep';
import { BookingSummary } from './summary/BookingSummary';
import { SelectDateTimeStep } from './steps/SelectDateTimeStep';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { useTenantStore } from '@/store/tenant-store';
import type { TenantContextData } from '@/types/tenant';
import { QueryProvider } from '@/shared/components/providers/QueryProvider';
import { ConfirmBookingStep } from './steps/ConfirmBookingStep';

interface Props {
  initialData: TenantContextData;
}

export function BookingWizard({ initialData }: Props) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useTenantStore.getState().setTenant(initialData);
    isInitialized.current = true;
  }

  const step = useBookingStore((s) => s.step);

  return (
    <QueryProvider>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <BookingBreadcrumb />

        <div className="mt-10 grid grid-cols-12 gap-14">
          <div className="col-span-7 w-full">
            {step === 1 && <SelectServiceStep />}
            {step === 2 && <SelectProfessionalStep />}
            {step === 3 && <SelectDateTimeStep />}
            {step === 4 && <ConfirmBookingStep />}
          </div>

          <div className="sticky top-8 col-span-5 w-full">
            <BookingSummary />
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
