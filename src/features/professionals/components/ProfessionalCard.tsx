import React from 'react';
import { type ProfessionalPublicData } from '../types/professional-types';
import { Text } from '@/shared/components/typography/Text';
import { Button } from '@/shared/components/ui/Button';

interface Props {
  professional: ProfessionalPublicData;
}

export const ProfessionalCard = ({ professional }: Props) => {
  const { avatarUrl, name } = professional;
  return (
    <li className="flex cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 transition-all duration-200">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="size-14 rounded-lg object-cover shadow-sm ring-2 ring-white"
          />
        ) : (
          <div className="flex size-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600 ring-2 ring-white">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <Text
            as="p"
            size="base"
            variant="default"
            weight="medium"
            className="leading-4"
          >
            {name}
          </Text>

          <Text as="span" size="sm" variant="muted">
            Barbero
          </Text>
        </div>
      </div>
      <Button type="button" size="sm" variant="outline" className="bg-white">
        Reservar
      </Button>
    </li>
  );
};
