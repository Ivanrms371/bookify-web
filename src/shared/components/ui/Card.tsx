import clsx from 'clsx';
import type { ComponentProps } from 'react';

type CardProps = ComponentProps<'div'>;

export const Card = ({ className = '', children, ...rest }: CardProps) => {
  return (
    <div {...rest} className={clsx('rounded-2xl p-5 shadow-sm', className)}>
      {children}
    </div>
  );
};
