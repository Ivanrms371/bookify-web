import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = 'md' | 'lg' | 'xl' | '2xl' | 'display' | 'hero';

const headingSizes: Record<HeadingSize, string> = {
  // Standard app hierarchy
  md: 'text-lg md:text-xl font-semibold tracking-tight text-gray-900',
  lg: 'text-xl md:text-2xl font-semibold tracking-tight text-gray-900',
  xl: 'text-2xl md:text-3xl font-semibold tracking-tight text-gray-900',
  '2xl': 'text-3xl md:text-4xl font-semibold tracking-tight text-gray-900',

  // Marketing / large sections
  display:
    'text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl text-gray-900',

  // Main landing hero
  hero: 'text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900',
};

const defaultTagSizeMap: Record<HeadingTag, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
};

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag | ElementType;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
}

export function Heading({
  as: Component = 'h1',
  size,
  children,
  className,
  ...props
}: HeadingProps) {
  const resolvedSize =
    size ??
    (typeof Component === 'string' && Component in defaultTagSizeMap
      ? defaultTagSizeMap[Component as HeadingTag]
      : 'lg');

  return (
    <Component
      className={cn('font-heading', headingSizes[resolvedSize], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
