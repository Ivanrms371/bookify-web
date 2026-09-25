import { CheckIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { cn } from '@/utils/cn';
import { useBookingStore } from '@/features/booking/store/booking-store';

export interface BookingBreadcrumbProps {
  currentStep?: number;
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export const APPOINTMENT_STEPS = [
  { id: 1, label: 'Servicios' },
  { id: 2, label: 'Profesional' },
  { id: 3, label: 'Fecha y hora' },
  { id: 4, label: 'Confirmar' },
];

export function BookingBreadcrumb({}: BookingBreadcrumbProps) {
  const { setStep, step: currentStep } = useBookingStore();
  return (
    <nav aria-label="Pasos de la reserva" className={'w-full'}>
      <ol className="flex flex-wrap items-center gap-2 text-sm sm:gap-3">
        {APPOINTMENT_STEPS.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <li
              key={step.id}
              className="flex cursor-pointer items-center gap-2 sm:gap-3"
            >
              <button
                type="button"
                onClick={() => setStep(step.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 text-left text-base font-medium transition-colors',
                  isCurrent && 'text-gray-800',
                  !isCurrent && 'text-gray-400'
                )}
              >
                <span>{step.label}</span>
              </button>

              {index < APPOINTMENT_STEPS.length - 1 && (
                <ChevronRightIcon
                  className={cn(
                    'size-5 shrink-0 text-gray-400',
                    isCurrent && 'text-gray-800'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
