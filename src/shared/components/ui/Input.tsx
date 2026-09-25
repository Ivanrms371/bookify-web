import clsx from 'clsx';
import type { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

export const Input = ({ className = '', children, ...rest }: InputProps) => {
  return (
    <input
      className={clsx(
        'h-14 w-full rounded-xl bg-white px-4 text-base text-gray-700 ring ring-gray-200 transition outline-none placeholder:text-gray-500 focus:ring-gray-500',
        className
      )}
      {...rest}
    />
  );
};
