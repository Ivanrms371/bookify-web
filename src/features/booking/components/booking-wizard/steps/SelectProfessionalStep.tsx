import { Heading } from '@/shared/components/typography/Heading';
import { motion } from 'motion/react';
import { Text } from '@/shared/components/typography/Text';
import { Button } from '@/shared/components/ui/Button';
import { useBookingStore } from '@/features/booking/store/booking-store';
import { CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '@/shared/utils/cn';
import { UsersIcon } from '@heroicons/react/24/outline';
import { useProfessionalsByService } from '@/features/professionals/api/get-professionals-by-service.api';
import type { TenantProfessional } from '@/shared/types/tenant';

export function SelectProfessionalStep() {
  const {
    selectedService,
    setSelectedProfessional,
    selectedProfessional,
    nextStep,
  } = useBookingStore();

  const { data: professionals = [], isLoading } = useProfessionalsByService(
    selectedService?.id
  );

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heading size="2xl" as="h2">
          Seleccionar Profesional
        </Heading>
      </motion.div>

      {isLoading ? (
        <ul className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProfessionalCardSkeleton key={index} index={index} />
          ))}
        </ul>
      ) : professionals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-8">
          <div className="mx-auto mb-2.5 rounded-xl bg-gray-200/60 p-3">
            <UsersIcon className="size-6 text-gray-600" />
          </div>
          <Text as="p" variant="muted" size="base" weight="medium">
            No hay profesionales disponibles actualmente.
          </Text>
        </div>
      ) : (
        <ul className="space-y-3">
          {professionals.map((professional, index) => (
            <ProfessionalCard
              index={index}
              isSelected={selectedProfessional?.id === professional.id}
              key={professional.id}
              professional={professional}
              onSelect={(p) => {
                setSelectedProfessional(p);
                nextStep();
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const ProfessionalCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.li
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
      className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar Skeleton */}
          <div className="size-14 shrink-0 rounded-2xl bg-gray-200" />

          {/* Name & Role */}
          <div className="space-y-2">
            <div className="h-4 w-36 rounded-xl bg-gray-200" />
            <div className="h-2 w-16 rounded-xl bg-gray-200" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="h-4 w-24 rounded-full bg-gray-200" />
      </div>
    </motion.li>
  );
};

interface ProfessionalCardProps {
  professional: TenantProfessional;
  isSelected: boolean;
  index: number;
  onSelect: (professional: TenantProfessional) => void;
}

const ProfessionalCard = ({
  professional,
  isSelected,
  onSelect,
  index,
}: ProfessionalCardProps) => {
  const initials = professional.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        'rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-300',
        isSelected && 'border-2 border-indigo-600'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {professional.avatarUrl ? (
            <img
              src={professional.avatarUrl}
              alt={professional.name}
              className="size-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-2xl border border-gray-300 bg-gray-100 text-xl font-semibold text-gray-800">
              {initials}
            </div>
          )}

          <div>
            <Text
              as="p"
              weight="semibold"
              size="lg"
              variant="default"
              className="leading-5"
            >
              {professional.name}
            </Text>
            <Text
              as="p"
              variant="subtle"
              size="sm"
              weight="medium"
              className="leading-5"
            >
              Barbero
            </Text>
          </div>
        </div>

        <Button
          size="sm"
          variant={isSelected ? 'primary' : 'outline'}
          onClick={() => onSelect(professional)}
          disabled={isSelected}
          className="disabled:opacity-100"
        >
          {isSelected ? (
            <>
              <CheckIcon className="size-4" />
              Seleccionado
            </>
          ) : (
            'Seleccionar'
          )}
        </Button>
      </div>
    </motion.li>
  );
};
