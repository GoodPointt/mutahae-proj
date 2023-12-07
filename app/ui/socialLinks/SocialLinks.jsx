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

  const socialLinks = [
    { link: watsapp, icon: <BsWhatsapp size={28} />, label: 'whatsapp' },
    { link: tg, icon: <BsTelegram size={28} />, label: 'telegram' },
    { link: fb, icon: <BsFacebook size={28} />, label: 'facebook' },
    { link: insta, icon: <BsInstagram size={28} />, label: 'instagram' },
  ];

  const createLink = (href, icon, aria) => (
    <Box as="li" key={aria}>
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
          transform: lang === 'en' ? 'translateX(-5px)' : 'translateX(5px)',
          cursor: 'pointer',
          bgColor: '#a98841',
        }}
        transition={'all 0.3s'}
      >
        {icon}
      </Link>
    </Box>
  );

  const renderedLinks = socialLinks.map(({ link, icon, label }) =>
    createLink(link, icon, label)
  );

  const position = lang === 'en' ? 'right' : 'left';

  return (
    <Box
      as="ul"
      position={pos}
      bottom={'20%'}
      style={{ [position]: 0 }}
      display={'flex'}
      flexDirection={'column'}
      gap={'3px'}
      zIndex="98"
    >
      {renderedLinks}
    </Box>
  );
};

export default SocialLinks;
