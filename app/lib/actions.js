'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCookie(prevState, formData) {
  const { lang, path } = Object.fromEntries(formData);

  if (!path) return '/';
  const segments = path.split('/');
  segments[1] = lang;
  const newPath = segments.join('/');
  cookies().set({
    name: 'lang',
    value: lang,
    httpOnly: true,
    path: '/',
  });
  revalidatePath(path);
  redirect(newPath);
}
