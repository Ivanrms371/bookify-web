type FormatAddressParams = {
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
};

export const formatAddress = ({
  addressLine1,
  addressLine2,
  city,
  province,
  country,
}: FormatAddressParams) => {
  return [addressLine1, addressLine2, city, province, country]
    .filter(Boolean)
    .join(', ');
};
