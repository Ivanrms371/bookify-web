import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { COUNTRIES } from '@/shared/constants/countries';

interface PhoneCountryCodeProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const PhoneCountryCode = ({
  value,
  onChange,
  disabled,
}: PhoneCountryCodeProps) => {
  const selectedCountry =
    COUNTRIES.find((c) => c.dialCode === value) || COUNTRIES[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="group flex h-14 w-32 shrink-0 items-center gap-2 rounded-xl bg-white px-3 py-4 text-base font-medium text-gray-800 ring ring-gray-200 transition outline-none hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:opacity-50 disabled:hover:bg-gray-100 data-[state=open]:ring-gray-500"
        >
          <img
            src={selectedCountry.flagUrl}
            alt={selectedCountry.name}
            className="h-auto w-5 rounded-xs object-cover shadow-sm"
          />
          <span>+{selectedCountry.dialCode}</span>
          <ChevronDownIcon className="size-5 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-gray-700" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 max-h-[300px] min-w-48 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
        >
          {COUNTRIES.map((c) => (
            <DropdownMenu.Item
              key={c.code}
              onClick={() => onChange(c.dialCode)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors outline-none select-none hover:bg-gray-100 focus:bg-gray-100"
            >
              <img
                src={c.flagUrl}
                alt={c.name}
                className="h-auto w-5 rounded-xs object-cover shadow-sm"
              />
              <span className="text-gray-800">{c.name}</span>
              <span className="ml-auto text-gray-800">+{c.dialCode}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
