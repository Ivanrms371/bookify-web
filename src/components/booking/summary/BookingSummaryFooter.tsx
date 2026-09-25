import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { Text } from '@/shared/components/typography/Text';
import { useBookingStore } from '@/features/booking/store/booking-store';

export const BookingSummaryFooter = () => {
  const {
    step,
    nextStep,
    selectedService,
    selectedProfessional,
    selectedDate,
    selectedTime,
    customerData,
    canGoToStep,
  } = useBookingStore();
  const isLastStep = step === 4;

  const onConfirmBooking = () => {
    // TODO: Implementar confirmación de reserva
    console.log('Reservar', {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      professional: selectedProfessional,
      customerData: customerData,
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-200 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Text variant="default" size="lead" as="p" weight="medium">
            Total
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <Text variant="default" size="lead" as="p" weight="medium">
            UYU{' '}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={selectedService?.price ?? 0}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="inline-block"
              >
                {selectedService?.price ?? 0}
              </motion.span>
            </AnimatePresence>
          </Text>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Button
          className="mt-6 w-full"
          variant="primary"
          size="lg"
          disabled={!canGoToStep(step + 1)}
          onClick={isLastStep ? onConfirmBooking : nextStep}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={isLastStep ? 'confirm' : 'continue'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-center gap-2"
            >
              {isLastStep ? 'Confirmar reserva' : 'Continuar'}
              <ArrowRightIcon className="size-4.5" />
            </motion.span>
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};
