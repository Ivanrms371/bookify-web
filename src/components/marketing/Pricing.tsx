import { useState } from 'react';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '@/utils/cn';
import { calculateMonthlyPrice, calculateSaving } from '@/utils/pricing';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/shared/components/typography/Heading';
import { Text } from '@/shared/components/typography/Text';
import {
  PLANS,
  type BillingCycle,
  type Plan,
} from '@/features/marketing/data/plans';

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const currentCycle: BillingCycle = isAnnual ? 'ANNUAL' : 'MONTHLY';

  // Ordenar siempre por sortOrder: Free (1) -> Pro (2) -> Pro+ (3)
  const sortedPlans: Plan[] = Object.values(PLANS).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* Switch Mensual / Anual */}
      <div className="relative mb-10 flex w-72 gap-4 rounded-full border border-gray-200/80 bg-white p-1 shadow-sm">
        <button
          onClick={() => setIsAnnual(false)}
          className="z-10 flex w-full flex-1 cursor-pointer items-center justify-center rounded-full bg-transparent py-2 text-sm font-medium text-gray-800 transition-colors duration-300"
          type="button"
        >
          Mensual
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className="z-10 flex w-full flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-transparent py-2 text-sm font-medium text-gray-800 transition-colors duration-300"
          type="button"
        >
          Anual
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600">
            -20%
          </span>
        </button>
        <span
          className={cn(
            'absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] translate-x-0 rounded-full bg-gray-100 transition-transform duration-300 ease-in-out',
            isAnnual && 'translate-x-full'
          )}
        />
      </div>

      {/* Grid de 3 Columnas (Mobile: 1 col, Desktop: 3 cols) */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {sortedPlans.map((plan) => {
          // Precios dinámicos según el toggle
          const pricingData =
            currentCycle === 'ANNUAL' && plan.pricing.ANNUAL
              ? plan.pricing.ANNUAL
              : plan.pricing.MONTHLY;

          // Si es anual y tiene precio mensual equivalente (ej: 11.99 o 19.99), mostramos ese
          const displayPrice =
            currentCycle === 'ANNUAL' &&
            pricingData.equivalentMonthlyPrice != null
              ? pricingData.equivalentMonthlyPrice
              : pricingData.price;

          const comparePrice = pricingData.compareAtPrice;

          // URL con query params hacia el puerto 5173
          const registerHref = `?plan=${plan.id}&billing=${currentCycle.toLowerCase()}`;

          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col justify-between rounded-3xl border border-gray-200/80 bg-gray-50/50 p-7 transition-all',
                plan.isPopular && 'border-gray-900 bg-gray-900 shadow-xl'
              )}
            >
              <div>
                <Heading
                  as="h3"
                  size="xl"
                  className={cn(
                    'mb-6 text-left font-bold',
                    plan.isPopular && 'text-gray-50'
                  )}
                >
                  {plan.title}
                </Heading>

                {/* Badge Ahorra 20% (solo cuando Anual está activo y tiene compareAtPrice) */}
                {currentCycle === 'ANNUAL' && comparePrice && (
                  <Text
                    size="xs"
                    as="span"
                    className={cn(
                      'absolute top-7 right-7 rounded-full bg-indigo-100 px-2.5 py-1 font-semibold text-indigo-600',
                      plan.isPopular &&
                        'border border-indigo-700/50 bg-indigo-900/60 text-indigo-200'
                    )}
                  >
                    Ahorra {calculateSaving(comparePrice, pricingData.price)}%
                  </Text>
                )}

                <div className="mb-8">
                  {/* Precio tachado de referencia anual (ej: $14.99/mes) */}
                  {currentCycle === 'ANNUAL' && comparePrice && (
                    <div className="relative mb-1 flex w-fit items-center gap-1">
                      <span
                        className={cn(
                          'text-sm text-gray-400',
                          plan.isPopular && 'text-gray-500'
                        )}
                      >
                        $
                      </span>
                      <span
                        className={cn(
                          'text-lg font-semibold text-gray-400',
                          plan.isPopular && 'text-gray-500'
                        )}
                      >
                        {calculateMonthlyPrice(comparePrice)}
                      </span>
                      <span
                        className={cn(
                          'text-xs text-gray-400',
                          plan.isPopular && 'text-gray-500'
                        )}
                      >
                        /mes
                      </span>
                      <div
                        className={cn(
                          'absolute w-full border-t border-gray-400',
                          plan.isPopular && 'border-gray-600'
                        )}
                      />
                    </div>
                  )}

                  {/* Precio principal */}
                  <div className="mb-2 flex items-end gap-1">
                    <span
                      className={cn(
                        'text-2xl font-medium text-gray-800',
                        plan.isPopular && 'text-gray-100'
                      )}
                    >
                      $
                    </span>
                    <span
                      className={cn(
                        'text-6xl leading-none font-semibold text-gray-800',
                        plan.isPopular && 'text-gray-100'
                      )}
                    >
                      {displayPrice}
                    </span>
                    <span
                      className={cn(
                        'text-base text-gray-600',
                        plan.isPopular && 'text-gray-300'
                      )}
                    >
                      /mes
                    </span>
                  </div>

                  <p
                    className={cn(
                      'text-left text-sm text-gray-600',
                      plan.isPopular && 'text-gray-300'
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Botón CTA -> Redirige a localhost:5173/register */}
                <Button
                  size="md"
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  className={cn(
                    'group mb-6 w-full cursor-pointer justify-center font-medium shadow-sm',
                    !plan.isPopular &&
                      'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                  )}
                  href={registerHref}
                >
                  {plan.cta}
                  <ArrowRightIcon className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Lista de características */}
              <ul className="space-y-3.5 border-t border-gray-200/60 pt-6 text-left">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      'flex items-center text-sm text-gray-700',
                      plan.isPopular && 'text-gray-200'
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2.5 size-5 shrink-0 rounded-full bg-indigo-100/70 p-0.5 text-indigo-600',
                        plan.isPopular && 'bg-gray-800 text-indigo-400'
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
