import { useState } from 'react';
import { cn } from '@/utils/cn';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Text } from '@/shared/components/typography/Text';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  itemClassName?: string;
  defaultOpenId?: string | null;
}

export const Accordion = ({
  items,
  className,
  itemClassName,
  defaultOpenId = null,
}: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('w-full divide-y divide-gray-200/80', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              'border-gray-200/80 py-6 transition-colors duration-200',
              itemClassName
            )}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="group flex w-full cursor-pointer items-start justify-between gap-4 text-left"
            >
              <Text as="span" variant="default" size="base" weight="medium">
                {item.title}
              </Text>
              <span
                className={cn(
                  'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-200/80 bg-white text-gray-600 transition-all duration-200 group-hover:border-gray-200/80 group-hover:text-gray-700',
                  isOpen && 'rotate-45'
                )}
              >
                <PlusIcon className="size-5 transition-transform duration-200" />
              </span>
            </button>

            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isOpen
                  ? 'mt-3 grid-rows-[1fr] opacity-100'
                  : 'mt-0 grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <Text as="div" variant="subtle" size="sm" className="pr-8">
                  {typeof item.content === 'string' ? (
                    <p>{item.content}</p>
                  ) : (
                    item.content
                  )}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
