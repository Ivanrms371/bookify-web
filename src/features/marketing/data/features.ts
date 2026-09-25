import {
  CalendarDaysIcon,
  UsersIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ClockIcon,
  BellAlertIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export const features = [
  {
    title: 'Agenda inteligente',
    description:
      'Gestiona citas y disponibilidad en tiempo real sin riesgo de solapamientos ni turnos duplicados.',
    icon: CalendarDaysIcon,
  },
  {
    title: 'Gestión de profesionales',
    description:
      'Administra tu equipo, asigna servicios individuales y personaliza los horarios de cada miembro.',
    icon: UsersIcon,
  },
  {
    title: 'Reservas online 24/7',
    description:
      'Permite que tus clientes agenden turnos desde cualquier dispositivo a cualquier hora del día.',
    icon: GlobeAltIcon,
  },
  {
    title: 'Estadísticas del negocio',
    description:
      'Analiza el rendimiento de tus profesionales, volumen de citas y servicios más solicitados.',
    icon: ChartBarIcon,
  },
  {
    title: 'Horarios flexibles',
    description:
      'Configura jornadas de trabajo, pausas de descanso y bloqueos que se adapten a tu rutina real.',
    icon: ClockIcon,
  },
  {
    title: 'Recordatorios automáticos',
    description:
      'Notificaciones y alertas por WhatsApp y correo electrónico para reducir ausencias y cancelaciones.',
    icon: BellAlertIcon,
  },
];
