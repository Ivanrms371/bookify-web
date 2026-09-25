import { Text } from '@/shared/components/typography/Text';
import { motion, AnimatePresence } from 'motion/react';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { addMinutesToTime } from '@/shared/utils/hours';
import {
  CalendarIcon,
  ClockIcon,
  DocumentCheckIcon,
  ScissorsIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { addMinutes, format, formatDate } from 'date-fns';
import { es } from 'date-fns/locale';

export const BookingSummaryContent = () => {
  const { selectedService, selectedProfessional, selectedDate, selectedTime } =
    useBookingStore();

  return (
    <div className="flex-1">
      <div className="divide-y divide-gray-200">
        <AnimatePresence initial={false}>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              className="overflow-hidden"
            >
              <div className="flex justify-between py-6">
                <div className="flex w-full items-start gap-3">
                  <ScissorsIcon className="size-5 shrink-0 text-indigo-500" />

                  <div className="flex flex-1 items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <Text
                        variant="default"
                        size="base"
                        as="p"
                        weight="normal"
                        className="leading-4"
                      >
                        {selectedService.name}
                      </Text>
                      <Text variant="subtle" size="sm" as="p" weight="normal">
                        {selectedService.durationMinutes} minutos
                      </Text>
                    </div>
                    <Text variant="default" size="base" as="p" weight="normal">
                      UYU {selectedService.price}
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {selectedProfessional && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              className="overflow-hidden"
            >
              <div className="flex justify-between py-6">
                <div className="flex items-center gap-3">
                  <UserIcon className="size-5 shrink-0 text-indigo-500" />
                  <div className="flex flex-col">
                    <Text
                      variant="default"
                      size="base"
                      as="p"
                      weight="normal"
                      className="leading-4"
                    >
                      {selectedProfessional.name}
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 py-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="size-5 shrink-0 text-indigo-500" />
                  <div className="flex flex-col">
                    <Text
                      variant="default"
                      size="base"
                      as="p"
                      weight="normal"
                      className="leading-4"
                    >
                      {formatDate(
                        selectedTime.startsAt,
                        "EEEE',' d 'de' MMMM",
                        {
                          locale: es,
                        }
                      )}
                    </Text>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ClockIcon className="size-5 shrink-0 text-indigo-500" />
                  <div className="flex flex-col">
                    <Text
                      variant="default"
                      size="base"
                      as="p"
                      weight="normal"
                      className="leading-4"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={`${format(selectedTime.startsAt, 'HH:mm')}-${format(selectedTime.endsAt, 'HH:mm')}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="inline-block"
                        >
                          {`${format(selectedTime.startsAt, 'HH:mm')} - ${format(
                            selectedTime.endsAt,
                            'HH:mm'
                          )}`}
                        </motion.span>
                      </AnimatePresence>
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
