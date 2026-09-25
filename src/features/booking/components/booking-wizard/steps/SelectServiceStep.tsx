import { Text } from '@/shared/components/typography/Text';
import { motion } from 'motion/react';
import { Button } from '@/shared/components/ui/Button';
import { Heading } from '@/shared/components/typography/Heading';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '@/shared/utils/cn';
import { useServices } from '@/features/services/api/get-services.api';
import { useTenantStore } from '@/shared/store/tenant-store';
import type { TenantService } from '@/shared/types/tenant';

export function SelectServiceStep() {
  const tenant = useTenantStore((s) => s.tenant);
  const { data: services = [], isLoading } = useServices(tenant?.id);
  const { setSelectedService, selectedService, nextStep } = useBookingStore();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heading size="2xl" as="h2">
          Seleccionar Servicio
        </Heading>
      </motion.div>

      {isLoading ? (
        <ul className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ServiceCardSkeleton key={index} index={index} />
          ))}
        </ul>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-8">
          <div className="mx-auto mb-2.5 rounded-xl bg-gray-200/60 p-3">
            <WrenchScrewdriverIcon className="size-6 text-gray-600" />
          </div>
          <Text as="p" variant="muted" size="base" weight="medium">
            No hay servicios disponibles actualmente.
          </Text>
        </div>
      ) : (
        <ul className="space-y-3">
          {services.map((service, index) => {
            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isSelected={selectedService?.id === service.id}
                onSelect={() => {
                  setSelectedService(service);
                  nextStep();
                }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

const ServiceCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
    >
      <div className="space-y-2">
        {/* Title & Duration */}
        <div className="space-y-1.5">
          <div className="h-5 w-40 rounded-xl bg-gray-200" />
          <div className="h-2 w-10 rounded-xl bg-gray-200" />
        </div>

        {/* Description */}
        <div className="space-y-1 pt-1">
          <div className="h-3.5 max-w-120 rounded-xl bg-gray-100" />
          <div className="h-3.5 max-w-72 rounded-xl bg-gray-100" />
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-3.5 w-20 rounded-xl bg-gray-200" />
          <div className="h-3.5 w-20 rounded-full bg-gray-200" />
        </div>
      </div>
    </motion.li>
  );
};

interface ServiceCardProps {
  service: TenantService;
  isSelected: boolean;
  index: number;
  onSelect: (service: TenantService) => void;
}

const ServiceCard = ({
  service,
  onSelect,
  isSelected,
  index,
}: ServiceCardProps) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      key={service.name}
      className={cn(
        'rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-300',
        isSelected && 'border-2 border-indigo-600'
      )}
    >
      <div className="space-y-2">
        <div>
          <Text as={'p'} weight="medium" size="lg" variant="default">
            {service.name}
          </Text>
          <Text as="span" variant="subtle" size="sm" weight="normal">
            {service.durationMinutes} min
          </Text>
        </div>

        <div>
          <Text as="p" variant="subtle" size="sm" weight="normal">
            {service.description}
          </Text>
        </div>

        <div className="flex items-center justify-between">
          <Text size="lg" variant="default" weight="medium">
            {'$'} {service.price}
          </Text>

          <Button
            size="sm"
            variant={isSelected ? 'primary' : 'outline'}
            onClick={() => onSelect(service)}
            disabled={isSelected}
            className="disabled:opacity-100"
          >
            {isSelected ? (
              <span className="flex items-center gap-2">
                <CheckIcon className="size-4" />
                Seleccionado
              </span>
            ) : (
              'Seleccionar'
            )}
          </Button>
        </div>
      </div>
    </motion.li>
  );
};
