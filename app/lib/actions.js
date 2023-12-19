'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createContact } from './api/instance';

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

const schema = z
  .object({
    name: z.string().trim(),
    // .min(1, { message: 'required' })
    // .regex(
    //   new RegExp(/^[a-zA-Z\u0590-\u05FF]+[-'s]?[a-zA-Z\u0590-\u05FF ]+$/),
    //   'invalid'
    // ),
    email: z.string().trim(),
    // .min(1, { message: 'required' })
    // .email({ message: 'invalid' }),
    phone: z
      .string()
      .trim()
      .min(1, { message: 'required' })
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
        'invalid'
      ),
  })
  .partial();

export async function submitData(prevState, formData) {
  const { name, email, phone } = Object.fromEntries(formData);

  const validatedFields = schema.safeParse({
    name,
    email,
    phone,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error.',
    };
  }
  try {
    const res = await createContact({ name, email, phone });

    if (res) {
      return { name, email, phone, message: 'succsess' };
    }
  } catch (error) {
    console.error(error);
  }
}
