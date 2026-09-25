import type { ServicePublicData } from '../types/service-types';
import { ServiceCard } from './ServiceCard';

interface Props {
  services: ServicePublicData[];
}

export const ServicesList = ({ services }: Props) => {
  return (
    <ul className="space-y-3">
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </ul>
  );
};
