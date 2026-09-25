import { Text } from '@/shared/components/typography/Text';
import { motion } from 'motion/react';
import { useProfessionalAvailabilitySlots } from '@/hooks/useProfessionalAvailabilitySlots';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { useTenantStore } from '@/store/tenant-store';
import { cn } from '@/utils/cn';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';

export const TimeSlotsList = () => {
  const tenant = useTenantStore((s) => s.tenant);
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const selectedService = useBookingStore((s) => s.selectedService);
  const selectedProfessional = useBookingStore((s) => s.selectedProfessional);

  const selectedTime = useBookingStore((s) => s.selectedTime);
  const setSelectedTime = useBookingStore((s) => s.setSelectedTime);

  const { data, isLoading } = useProfessionalAvailabilitySlots({
    tenantId: tenant?.id ?? '',
    serviceId: selectedService?.id ?? '',
    professionalId: selectedProfessional?.id ?? '',
    date: selectedDate ?? '',
  });

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  const slots = data?.slots ?? [];

  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-1"
      >
        <Text variant="default" weight="semibold" className="text-xl" as="p">
          Selecciona una hora
        </Text>
      </motion.div>
      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <TimeSlotSkeleton key={index} index={index} />
            ))
          : slots.map((slot, index) => {
              const isSelected = selectedTime?.time === slot.time;
              return (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={cn(
                    'relative h-12.5 w-full cursor-pointer rounded-2xl bg-white px-6 text-left ring ring-gray-200 transition-colors duration-300 hover:bg-gray-100',
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

                  <CheckIcon
                    className={cn(
                      'absolute top-1/2 right-5 size-5 -translate-y-1/2 scale-75 text-indigo-500 opacity-0 transition-all duration-300',
                      isSelected && 'scale-100 opacity-100'
                    )}
                  />
                </motion.button>
              );
            })}
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
