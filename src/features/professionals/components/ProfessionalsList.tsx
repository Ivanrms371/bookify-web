import { type ProfessionalPublicData } from '../types/professional-types';
import { ProfessionalCard } from './ProfessionalCard';

interface Props {
  professionals: ProfessionalPublicData[];
}

export const ProfessionalsList = ({ professionals }: Props) => {
  return (
    <ul className="space-y-3">
      {professionals.map((professional) => (
        <ProfessionalCard professional={professional} />
      ))}
    </ul>
  );
};
