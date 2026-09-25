import { Accordion, type AccordionItem } from '@/shared/components/ui/Accordion';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const defaultFAQs: FAQItem[] = [
  {
    id: 'get-started',
    question: '¿Qué necesito para empezar a usar Bookify?',
    answer:
      'Solo necesitas registrarte con tu correo electrónico. En menos de 5 minutos puedes configurar el perfil de tu negocio, agregar tus servicios y definir tus horarios de disponibilidad. No requieres tarjeta de crédito para iniciar con el plan Free.',
  },
  {
    id: 'client-app',
    question: '¿Mis clientes necesitan descargar una app para reservar?',
    answer:
      'No. Tus clientes acceden directamente desde cualquier navegador móvil o de escritorio a través de tu enlace personalizado (por ejemplo, bookify.app/tu-negocio). Es un proceso rápido, intuitivo y sin fricciones.',
  },
  {
    id: 'reminders',
    question: '¿Cómo funcionan los recordatorios por WhatsApp y Email?',
    answer:
      'Bookify envía notificaciones de confirmación inmediatas y recordatorios automáticos antes de cada cita para reducir drásticamente las ausencias (no-shows). Los planes Pro y Pro+ incluyen cuotas mensuales de mensajes por WhatsApp y correo electrónico.',
  },
  {
    id: 'team-management',
    question: '¿Puedo gestionar múltiples profesionales o sucursales?',
    answer:
      '¡Sí! Con el plan Pro+ puedes gestionar hasta 5 profesionales, cada uno con sus propios servicios asignados, horarios de trabajo y calendarios independientes, todo coordinado desde un único panel de administración.',
  },
  {
    id: 'cancellation-plans',
    question: '¿Puedo cambiar de plan o cancelar en cualquier momento?',
    answer:
      'Por supuesto. No hay contratos de permanencia ni letras pequeñas. Puedes cambiar de plan mensual a anual, mejorar tu suscripción o cancelar cuando lo desees desde la configuración de tu cuenta.',
  },
  {
    id: 'calendar-sync',
    question: '¿Puedo sincronizar mis citas con Google Calendar?',
    answer:
      'Sí, Bookify ofrece sincronización para que tus reservas se reflejen automáticamente en tu calendario personal y evites solapamientos o conflictos de horario.',
  },
];

interface FAQProps {
  items?: FAQItem[];
  className?: string;
}

export const FAQ = ({ items = defaultFAQs, className }: FAQProps) => {
  const accordionItems: AccordionItem[] = items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return <Accordion items={accordionItems} className={className} />;
};
