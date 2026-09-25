import { Heading } from '@/shared/components/typography/Heading';
import { motion } from 'motion/react';
import { TimeSlotsList } from './TimeSlotsList';
import { DatePickerCarousel } from './DatePickerCarousel';

export const SelectDateTimeStep = () => {
  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heading size="2xl" as="h2">
          Selecciona una fecha y hora
        </Heading>
      </motion.div>

      <DatePickerCarousel />

      <TimeSlotsList />
    </div>
  );
};
