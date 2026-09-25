import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn';
import { Text } from '@/shared/components/typography/Text';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/Button';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { generateDayItems, type FormattedDayItem } from '@/utils/dates';
import { useCarouselScroll } from '@/hooks/useCarouselScroll';
import { useProfessionalAvailabilityOverview } from '@/hooks/useProfessionalAvailabilityOverview';
import { useTenantStore } from '@/store/tenant-store';

const ITEM_TOTAL_WIDTH = 80;

export const DatePickerCarousel = () => {
  const tenantId = useTenantStore((s) => s.tenant?.id);
  const selectedServiceId = useBookingStore((s) => s.selectedService?.id);
  const selectedProfessionalId = useBookingStore(
    (s) => s.selectedProfessional?.id
  );
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const setSelectedDate = useBookingStore((s) => s.setSelectedDate);

  const [days] = useState<FormattedDayItem[]>(() =>
    generateDayItems({ count: 30 })
  );

  const startDate = days[0]?.key;

  const { data: overview, isLoading } = useProfessionalAvailabilityOverview({
    tenantId: tenantId!,
    serviceId: selectedServiceId!,
    professionalId: selectedProfessionalId!,
    startDate,
  });

  useEffect(() => {
    setSelectedDate(days[0]?.key);
  }, []);

  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    checkScrollLimits,
  } = useCarouselScroll<HTMLDivElement>({ itemTotalWidth: ITEM_TOTAL_WIDTH });

  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-3.5 flex items-end justify-between"
      >
        <Text variant="default" weight="semibold" className="text-xl" as="p">
          Seleccionar una fecha
        </Text>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={!canScrollLeft}
            onClick={() => scroll('left')}
            aria-label="Ver días anteriores"
          >
            <ChevronLeftIcon className="size-5 text-gray-800" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={!canScrollRight}
            onClick={() => scroll('right')}
            aria-label="Ver días siguientes"
          >
            <ChevronRightIcon className="size-5 text-gray-800" />
          </Button>
        </div>
      </motion.div>

      <div
        ref={containerRef}
        onScroll={checkScrollLimits}
        role="radiogroup"
        aria-label="Días disponibles"
        className="flex w-full scrollbar-none gap-4 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {days.map(({ key, dayNumber, dayOfWeek, month }, index) => {
          if (isLoading) {
            return <DaySkeleton key={key} index={index} />;
          }

          const isSelected = selectedDate === key;
          const dayData = overview?.days?.[key];

          // Mientras carga el overview se asume disponible de forma optimista
          const status = dayData?.status ?? 'AVAILABLE';
          const isUnavailable =
            !isLoading && (status === 'CLOSED' || status === 'EMPTY');
          const isSaturated = !isLoading && status === 'SATURATED';

          return (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedDate(key)}
              className={cn(
                'flex w-16 shrink-0 cursor-pointer flex-col items-center rounded-2xl border py-3 transition-colors duration-300 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',

                isSelected && 'border-transparent bg-indigo-500 shadow-sm',

                !isSelected &&
                  isUnavailable &&
                  'border-gray-200 bg-white opacity-65 hover:bg-gray-100',

                !isSelected &&
                  !isUnavailable &&
                  isSaturated &&
                  'border-orange-200 bg-orange-50 hover:bg-orange-100/70',

                !isSelected &&
                  !isUnavailable &&
                  !isSaturated &&
                  'border-gray-200 bg-white hover:bg-gray-100'
              )}
            >
              <span
                className={cn(
                  'text-sm font-normal capitalize transition-colors duration-300',
                  isSelected && 'text-white',
                  !isSelected && isSaturated && 'text-orange-900',
                  !isSelected && !isSaturated && 'text-gray-700'
                )}
              >
                {dayOfWeek}
              </span>
              <span
                className={cn(
                  'text-2xl font-semibold transition-colors duration-300',
                  isSelected && 'text-white',
                  !isSelected && isSaturated && 'text-orange-950',
                  !isSelected && !isSaturated && 'text-gray-950'
                )}
              >
                {dayNumber}
              </span>
              <span
                className={cn(
                  'text-sm font-normal capitalize transition-colors duration-300',
                  isSelected && 'text-white',
                  !isSelected && isSaturated && 'text-orange-800/80',
                  !isSelected && !isSaturated && 'text-gray-500'
                )}
              >
                {month}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

const DaySkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex h-20 w-16 shrink-0 animate-pulse flex-col items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white py-3"
    >
      <div className="h-2 w-4 rounded-md bg-gray-200" />
      <div className="h-2.5 w-8 rounded-md bg-gray-200" />
      <div className="h-2 w-4 rounded-md bg-gray-200" />
    </motion.div>
  );
};
