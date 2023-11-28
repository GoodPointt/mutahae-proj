import 'server-only';

const dictionaries = {
  en: () =>
    import('@/app/lib/locales/en.json').then((module) => module.default),
  he: () =>
    import('@/app/lib/locales/he.json').then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
