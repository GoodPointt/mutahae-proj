'use client';

import { usePathname } from 'next/navigation';

const useLang = () => {
  const pathname = usePathname();
  return pathname.split('/')[1];
};

export default useLang;
