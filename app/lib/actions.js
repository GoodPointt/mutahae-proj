"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createContact } from "./api/instance";
import sendEmail from "./utils/sendEmail";

export async function createCookie(prevState, formData) {
  const { lang, path } = Object.fromEntries(formData);

  if (!path) return "/";
  const segments = path.split("/");
  segments[1] = lang;
  const newPath = segments.join("/");
  cookies().set({
    name: "lang",
    value: lang,
    httpOnly: true,
    path: "/",
  });
  revalidatePath(path);
  redirect(newPath);
}

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(2).max(7),
});

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
      message: "Error.",
    };
  }
  try {
    const res = await createContact({ name, email, phone });

    if (res) {
      //await sendEmail({ name, email, phone });
      return { name, email, phone, message: "succsess" };
    }
  } catch (error) {
    console.log(error);
  }

  //revalidatePath(path);
  //redirect(newPath);
}
