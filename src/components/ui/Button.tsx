import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline:
    'border border-gray-300 bg-transparent text-gray-900 shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:bg-gray-100 bg-white',
  ghost: 'text-gray-700 hover:bg-gray-200/60',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-full gap-1.5',
  md: 'h-10 px-5 text-sm rounded-full gap-2',
  lg: 'h-11 px-6 text-base rounded-full gap-2.5',

  icon: 'h-8 w-8 rounded-full',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  href?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Component
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden font-medium tracking-normal transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
