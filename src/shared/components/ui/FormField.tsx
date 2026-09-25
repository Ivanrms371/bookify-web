import type { ReactNode } from 'react';

type FormFieldProps = {
  label?: string;
  labelId?: string;
  children: ReactNode;
  errorMessage?: string;
};

export const FormField = ({
  label,
  labelId,
  children,
  errorMessage,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label htmlFor={labelId} className="font-medium text-gray-600">
          {label}
        </label>
      )}

      {children}

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
