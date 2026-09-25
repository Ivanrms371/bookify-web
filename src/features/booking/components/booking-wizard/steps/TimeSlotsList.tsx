import { Text } from '@/shared/components/typography/Text';
import { motion } from 'motion/react';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { useTenantStore } from '@/store/tenant-store';
import { cn } from '@/utils/cn';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import type { Slot } from '@/features/availability/types/availability-types';
import {
  useCheckSlotAvailability,
  useProfessionalAvailabilitySlots,
} from '@/features/availability';
import { Spinner } from '@/shared/components/ui/Spinner';
import { formatDate } from 'date-fns';
import { es } from 'date-fns/locale';

const formatFriendlyDate = (dateStr: string): string => {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, (month ?? 1) - 1, day ?? 1);
    const formatted = formatDate(dateObj, "EEEE, d 'de' MMMM", {
      locale: es,
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return dateStr;
  }
};

export const TimeSlotsList = () => {
  const tenant = useTenantStore((s) => s.tenant);
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const setSelectedDate = useBookingStore((s) => s.setSelectedDate);
  const selectedService = useBookingStore((s) => s.selectedService);
  const selectedProfessional = useBookingStore((s) => s.selectedProfessional);

  const selectedTime = useBookingStore((s) => s.selectedTime);
  const setSelectedTime = useBookingStore((s) => s.setSelectedTime);

  const [unvailableSlots, setUnvailableSlots] = useState<string[]>([]);
  const [checkingSlot, setCheckingSlot] = useState<string | null>(null);

  const { data, isLoading } = useProfessionalAvailabilitySlots({
    tenantId: tenant?.id,
    serviceId: selectedService?.id,
    professionalId: selectedProfessional?.id,
    date: selectedDate,
  });

  const { mutateAsync: checkSlotAvailability } = useCheckSlotAvailability();

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  const handleSelectTime = async (slot: Slot) => {
    setSelectedTime(null);
    if (
      !selectedProfessional?.id ||
      !tenant?.id ||
      !selectedService?.id ||
      !selectedDate
    ) {
      return;
    }
    setCheckingSlot(slot.time);

    setTimeout(async () => {
      const result = await checkSlotAvailability({
        professionalId: selectedProfessional.id,
        serviceId: selectedService.id,
        tenantId: tenant.id,
        startsAt: slot.startsAt,
      });

      if (!result.available) {
        setUnvailableSlots((prev) => [...prev, slot.time]);
        setCheckingSlot(null);
        return;
      }

      setSelectedTime(slot);
      setCheckingSlot(null);
    }, 2000);
  };

  const slots = data?.slots ?? [];
  const nextAvailable = data?.nextAvailable;

  return (
    <div className="mt-8">
      {(isLoading || slots.length > 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-3.5"
        >
          <Text variant="default" weight="semibold" className="text-xl" as="p">
            Selecciona una hora
          </Text>
        </motion.div>
      )}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <TimeSlotSkeleton key={index} index={index} />
          ))
        ) : slots.length > 0 ? (
          slots.map((slot, index) => {
            const isSelected = selectedTime?.time === slot.time;
            const isUnvailable = unvailableSlots.includes(slot.time);
            return (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isUnvailable ? 0.5 : 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={slot.time}
                type="button"
                onClick={() => !isUnvailable && handleSelectTime(slot)}
                className={cn(
                  'relative h-12.5 w-full cursor-pointer rounded-2xl bg-white px-6 text-left ring ring-gray-200 transition-colors duration-300 hover:bg-gray-100',
                  isUnvailable && 'cursor-not-allowed opacity-50',
                  isSelected &&
                    'cursor-default ring-2 ring-indigo-500 hover:bg-white'
                )}
              >
                <span
                  className={cn(
                    'text-base text-gray-700',
                    isSelected && 'font-medium text-gray-800'
                  )}
                >
                  {slot.time}
                </span>

                {checkingSlot === slot.time && (
                  <span className="absolute top-1/2 right-5 -translate-y-1/2">
                    <Spinner />
                  </span>
                )}

                {isUnvailable && (
                  <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm">
                    No disponible
                  </span>
                )}

                <CheckIcon
                  className={cn(
                    'absolute top-1/2 right-5 size-5 -translate-y-1/2 scale-75 text-indigo-500 opacity-0 transition-all duration-300',
                    isSelected && 'scale-100 opacity-100'
                  )}
                />
              </motion.button>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-20 flex flex-col items-center justify-center rounded-2xl text-center"
          >
            <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-500/20">
              <CalendarIcon className="size-6 text-indigo-500" />
            </div>

            <Text
              variant="default"
              weight="semibold"
              className="text-base text-gray-900"
              as="p"
            >
              No hay horarios disponibles
            </Text>

            {nextAvailable?.date ? (
              <>
                <Text
                  variant="muted"
                  className="mt-1.5 max-w-sm text-sm text-gray-500"
                  as="p"
                >
                  Disponible a partir del{' '}
                  <span className="font-medium text-gray-900">
                    {formatFriendlyDate(nextAvailable.date)}
                  </span>
                  .
                </Text>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(nextAvailable.date)}
                  className="mt-3.5"
                >
                  <span>Ir a la siguiente fecha disponible</span>
                  <ArrowRightIcon className="size-4" />
                </Button>
              </>
            ) : (
              <Text
                variant="muted"
                className="mt-1.5 max-w-sm text-sm text-gray-500"
                as="p"
              >
                No encontramos turnos disponibles para las próximas fechas con
                este profesional.
              </Text>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TimeSlotSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative flex h-12.5 w-full animate-pulse items-center rounded-2xl bg-white px-6 text-left ring ring-gray-200"
    >
      <div className="h-2 w-12 rounded-md bg-gray-200" />
    </motion.div>
  );
};
