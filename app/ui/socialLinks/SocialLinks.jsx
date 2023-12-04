import { fetchContacts } from '@/app/lib/api/instance';
import { Box, Link } from '@chakra-ui/react';
import { BsWhatsapp, BsFacebook, BsInstagram } from 'react-icons/bs';

const SocialLinks = async ({ lang, pos = 'fixed' }) => {
  const {
    data: [{ attributes }],
  } = await fetchContacts(lang);

  const { insta, fb, watsapp } = attributes;

  const createLink = (href, icon) => (
    <Link
      href={href}
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
      {createLink(fb, <BsFacebook size={28} />)}
      {createLink(watsapp, <BsWhatsapp size={28} />)}
      {createLink(insta, <BsInstagram size={28} />)}
    </Box>
  );
};

export default SocialLinks;
