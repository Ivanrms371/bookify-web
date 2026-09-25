import { useEffect, useState } from 'react';

export function Spinner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    import('ldrs').then(({ dotPulse }) => {
      dotPulse.register();
      setMounted(true);
    });
  }, []);

  if (!mounted) return null;

  return (
    <l-dot-pulse size="18" bg-opacity="0" speed="1" color="currentColor" />
  );
}
