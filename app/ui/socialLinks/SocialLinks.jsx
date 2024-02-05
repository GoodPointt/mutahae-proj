'use client';

import { Box, Link } from '@chakra-ui/react';

import { socialLinks } from '@/app/lib/data';

const SocialLinks = ({ lang, contacts }) => {
	const { insta, fb, watsapp, tg, viber } = contacts;

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

	const renderedLinks = socialLinks(watsapp, viber, tg, fb, insta).map(
		({ link, icon, label }) => createLink(link, icon, label)
	);

	const position = lang === 'en' ? 'left' : 'right';

	return (
		<Box
			as="ul"
			width={{ base: '100%', xl: '40px' }}
			position={{ base: 'relative', xl: 'fixed' }}
			bottom={{ lg: '20%' }}
			style={{ [position]: 0 }}
			display={'flex'}
			flexDirection={{ base: 'row', xl: 'column' }}
			justifyContent={{ base: 'space-evenly', xl: 'flex-start' }}
			gap={{ lg: '4px' }}
			zIndex="98"
		>
			{renderedLinks}
		</Box>
	);
};

export default SocialLinks;
