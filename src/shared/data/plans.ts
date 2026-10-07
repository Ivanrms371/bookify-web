export type Plan = {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  features: string[];
  sortOrder: number;
  isPopular: boolean;
  billingCycle: 'MONTHLY' | 'ANNUAL' | null;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: 'free',
    title: 'Free',
    price: 0,
    compareAtPrice: null,
    description: 'Ideal para empezar tu negocio',
    features: [
      '1 profesional',
      'Hasta 10 servicios',
      'Reservas ilimitadas',
      'Página de reservas',
      'Estadísticas básicas',
      'Sin recordatorios',
    ],
    billingCycle: null,
    sortOrder: 1,
    isPopular: false,
    cta: 'Empezar ahora',
  },
  {
    id: 'pro',
    title: 'Pro',
    price: 14.99,
    compareAtPrice: null,
    description: 'Ideal para pequeños equipos',
    features: [
      'Todo lo del plan Free',
      'Hasta 3 profesionales',
      'Hasta 30 servicios',
      'Recordatorios automáticos',
      'Estadísticas avanzadas',
      'Soporte prioritario',
      'Hasta 200 WhatsApp/mes',
      'Hasta 400 emails/mes',
    ],
    sortOrder: 2,
    billingCycle: 'MONTHLY',
    isPopular: true,
    cta: 'Empezar ahora',
  },
  {
    id: 'pro_plus',
    title: 'Pro+',
    price: 24.99,
    compareAtPrice: null,
    description: 'Ideal para equipos de hasta 8 profesionales',
    features: [
      'Todo lo del plan Pro',
      'Hasta 8 profesionales',
      'Hasta 60 servicios',
      'Gestión de profesionales',
      'Panel de administración',
      'Hasta 1200 emails/mes',
      'Hasta 500 WhatsApp/mes',
    ],
    sortOrder: 3,
    billingCycle: 'MONTHLY',
    isPopular: false,
    cta: 'Empezar ahora',
  },
  {
    id: 'pro',
    title: 'Pro',
    price: 143.88,
    compareAtPrice: 179.88,
    description: 'Ideal para pequeños equipos',
    features: [
      'Todo lo del plan Free',
      'Hasta 3 profesionales',
      'Hasta 30 servicios',
      'Recordatorios automáticos',
      'Estadísticas avanzadas',
      'Soporte prioritario',
      'Hasta 200 WhatsApp/mes',
      'Hasta 400 emails/mes',
    ],
    sortOrder: 2,
    billingCycle: 'ANNUAL',
    isPopular: true,
    cta: 'Empezar ahora',
  },
  {
    id: 'pro_plus',
    title: 'Pro+',
    price: 239.88,
    compareAtPrice: 299.88,
    description: 'Ideal para equipos de hasta 8 profesionales',
    features: [
      'Todo lo del plan Pro',
      'Hasta 8 profesionales',
      'Hasta 60 servicios',
      'Gestión de profesionales',
      'Panel de administración',
      'Hasta 1200 emails/mes',
      'Hasta 500 WhatsApp/mes',
    ],
    sortOrder: 3,
    billingCycle: 'ANNUAL',
    isPopular: false,
    cta: 'Empezar ahora',
  },
];
