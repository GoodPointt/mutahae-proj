import { fetchContacts } from '@/app/lib/api/instance';
import { Box, Link } from '@chakra-ui/react';
import {
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
  BsTelegram,
} from 'react-icons/bs';

const SocialLinks = async ({ lang, pos = 'fixed' }) => {
  const contacts = await fetchContacts(lang);

  const { insta, fb, watsapp, tg } = contacts;

  const createLink = (href, icon, aria) => (
    <Link
      href={href}
      aria-label={aria}
      target="_blank"
      rel="noopener noreferrer nofollow"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      boxSize={'40px'}
      borderRadius={'4px'}
      bgColor={'#a9884173'}
      color={'#ccc'}
      _hover={{
        transform: 'translateX(-5px)',
        cursor: 'pointer',
        bgColor: '#a98841',
      }}
      transition={'all 0.3s'}
    >
      {icon}
    </Link>
  );

  return (
    <Box
      position={pos}
      bottom={'20%'}
      right={'0'}
      display={'flex'}
      flexDirection={'column'}
      gap={'3px'}
      zIndex="98"
    >
      {createLink(watsapp, <BsWhatsapp size={28} />, 'whatsapp')}
      {createLink(tg, <BsTelegram size={28} />, 'telegram')}
      {createLink(fb, <BsFacebook size={28} />, 'facebook')}
      {createLink(insta, <BsInstagram size={28} />, 'instagram')}
    </Box>
  );
};

export default SocialLinks;
