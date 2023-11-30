"use client";

import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";
import { List, ListItem, VisuallyHiddenInput } from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { createCookie } from "@/app/lib/actions";
import SubmitButton from "../../submitButton/SubmitButton";

const LocaleSwitcher = () => {
  const pathName = usePathname();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useFormState(createCookie, undefined);

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <List>
      {i18n.locales.map((locale) => {
        return (
          <ListItem key={locale}>
            <form action={dispatch}>
              <VisuallyHiddenInput name={"lang"} defaultValue={locale} />
              <VisuallyHiddenInput
                name={"path"}
                defaultValue={redirectedPathName(locale)}
              />
              <SubmitButton variant="solid">{locale}</SubmitButton>
            </form>
          </ListItem>
        );
      })}
    </List>
  );
};
export default LocaleSwitcher;
