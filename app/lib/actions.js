"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCookie(prevState, formData) {
  const { lang, path } = Object.fromEntries(formData);
  console.log("path: ", path);
  cookies().set({
    name: "lang",
    value: lang,
    httpOnly: true,
    path: "/",
  });
  revalidatePath(path);
  redirect(path);
}
