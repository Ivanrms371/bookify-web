import { motion } from 'motion/react';
import { Heading } from '@/shared/components/typography/Heading';
import { Text } from '@/shared/components/typography/Text';
import { useTenantStore } from '@/store/tenant-store';
import { formatAddress } from '@/features/tenant/utils/format-address';

export const BookingSummaryHeader = () => {
  const { tenant } = useTenantStore();

  if (!tenant) return null;

  const {
    name,
    coverUrl,
    addressLine1,
    addressLine2,
    city,
    province,
    country,
  } = tenant;

  return (
    <div className="flex items-center gap-4">
      {coverUrl && (
        <motion.img
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          src={coverUrl}
          className="size-18 rounded-xl object-cover shadow-md"
          alt=""
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex flex-col"
      >
        <Heading size="md" as="h2">
          {name}
        </Heading>
        <Text
          as="p"
          variant="subtle"
          className="leading-5"
          size="base"
          weight="normal"
        >
          {formatAddress({
            addressLine1,
            addressLine2,
            city,
            province,
            country,
          })}
        </Text>
      </motion.div>
    </div>
  );
};
