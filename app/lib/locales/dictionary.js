import 'server-only';

import { cache } from 'react';

const dictionaries = {
  en: () => import('@/app/lib/locales/en.json').then(module => module.default),
  he: () => import('@/app/lib/locales/he.json').then(module => module.default),
};

const fetchDictionary = async locale => {
  if (!locale) return dictionaries['en']();
  return dictionaries[locale]();
};

export const getDictionary = cache(fetchDictionary);
