import { Heading } from '@/shared/components/typography/Heading';
import { motion } from 'motion/react';
import { Input } from '@/components/ui/Input';
import { FormField } from '@/components/ui/FormField';
import { PhoneCountryCode } from '@/components/ui/PhoneCountryCode';
import { useBookingStore } from '@/features/booking/store/booking-store';

export const ConfirmBookingStep = () => {
  const { customerData, setCustomerData } = useBookingStore();

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heading size="2xl" as="h2">
          Confirmar Reserva
        </Heading>
      </motion.div>

      <form className="mt-4">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FormField labelId="name" label="Nombre Completo">
              <Input
                type="text"
                name="name"
                id="name"
                value={customerData.name}
                onChange={(e) => setCustomerData({ name: e.target.value })}
                placeholder="Tu nombre completo"
              />
            </FormField>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <FormField labelId="email" label="Correo electrónico">
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                value={customerData.email}
                onChange={(e) => setCustomerData({ email: e.target.value })}
                placeholder="Tu correo electrónico"
              />
            </FormField>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FormField labelId="phoneNumber-number" label="Número de teléfono">
              <div className="flex items-center gap-3">
                <PhoneCountryCode
                  value={customerData.phoneCodeNumber || '598'}
                  onChange={(dialCode) =>
                    setCustomerData({ phoneCodeNumber: dialCode })
                  }
                />
                <Input
                  type="tel"
                  name="phoneNumber-number"
                  id="phoneNumber-number"
                  autoComplete="tel"
                  value={customerData.phoneNumber}
                  onChange={(e) =>
                    setCustomerData({ phoneNumber: e.target.value })
                  }
                  placeholder="099 123 456"
                  className="flex-1"
                />
              </div>
            </FormField>
          </motion.div>
        </div>
      </form>
    </div>
  );
};
