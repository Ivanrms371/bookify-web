interface FooterLinkProps {
  label: string;
  href: string;
}

export const FooterLink = ({ label, href }: FooterLinkProps) => {
  return (
    <a
      href={href}
      className="text-sm text-gray-700 transition hover:text-indigo-600"
    >
      {label}
    </a>
  );
};
