'use client';

import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { List, ListItem, VisuallyHiddenInput } from '@chakra-ui/react';
import { useFormState } from 'react-dom';
import { createCookie } from '@/app/lib/actions';
import SubmitButton from '../../submitButton/SubmitButton';
import { useEffect, useState } from 'react';

const LocaleSwitcher = () => {
  const pathName = usePathname();
  const [path, setPath] = useState(pathName);

  // const lang = useLang(); //client
  // const lang = getLang(); //server
  // console.log(lang);

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useFormState(createCookie, undefined);

  return (
    <List>
      <ListItem>
        <form action={dispatch}>
          <VisuallyHiddenInput name={'lang'} defaultValue={i18n.locales[0]} />
          <VisuallyHiddenInput
            name={'path'}
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <SubmitButton bgColor={'transparent'}>{i18n.locales[0]}</SubmitButton>
        </form>
      </ListItem>
      <ListItem>
        <form action={dispatch}>
          <VisuallyHiddenInput name={'lang'} defaultValue={i18n.locales[1]} />

          <VisuallyHiddenInput
            name={'path'}
            onChange={(e) => setPath(e.target.value)}
            value={path}
          />
          <SubmitButton bgColor={'transparent'}>{i18n.locales[1]}</SubmitButton>
        </form>
      </ListItem>
    </List>
  );
};
export default LocaleSwitcher;
