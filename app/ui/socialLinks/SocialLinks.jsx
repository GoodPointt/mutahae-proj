import { Box, Link } from '@chakra-ui/react';

import { socialLinks } from '@/app/lib/data';

const SocialLinks = async ({ lang, pos = 'fixed', contacts }) => {
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
