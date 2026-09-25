import {
  CogIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

export const steps = [
  {
    number: '01',
    title: 'Configura tu negocio',
    description:
      'Define tus servicios, profesionales y horarios de disponibilidad en minutos. Sin configuraciones complejas.',
    icon: CogIcon,
  },
  {
    number: '02',
    title: 'Comparte tu enlace',
    description:
      'Obtén una página de reservas personalizada lista para compartir con tus clientes por WhatsApp, redes sociales o tu web.',
    icon: LinkIcon,
  },
  {
    number: '03',
    title: 'Recibe reservas',
    description:
      'Tus clientes reservan cuando quieren. Tú recibes notificaciones y gestionas todo desde un solo lugar.',
    icon: ClipboardDocumentCheckIcon,
  },
];
