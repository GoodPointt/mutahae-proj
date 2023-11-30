import { headers } from 'next/headers';

const getLang = () => {
  const heads = headers();
  const pathname = heads.get('next-url');
  if (!pathname) return;
  return pathname.split('/')[1];
};

export default getLang;
