import { motion } from 'motion/react';
import type { ServicePublicData } from '../types/service-types';
import { Text } from '@/shared/components/typography/Text';
import { Button } from '@/shared/components/ui/Button';
import { CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '@/shared/utils/cn';

interface Props {
  service: ServicePublicData;
  onSelect?: (service: ServicePublicData) => void;
  isSelected?: boolean;
  index: number;
}

export const ServiceCard = ({
  service,
  onSelect,
  isSelected,
  index,
}: Props) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.2 }}
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
            onClick={() => onSelect?.(service)}
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
