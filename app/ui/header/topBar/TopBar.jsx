import { Box, Flex, Link, Text } from '@chakra-ui/react';

import { iconData } from '@/app/lib/data';

import TopMenu from '../topMenu/TopMenu';

const TopBar = ({ flexDir = 'row', gap = '0', contacts, lang, authToken }) => {
	const renderIconLink = ({ icon, text, href }) => (
		<Box as="li" key={href}>
			<Link
				key={text}
				href={href || '/'}
				rel="noopener noreferrer nofollow"
				target={!href.includes('tel') ? '_blank' : null}
				display="flex"
				alignItems="center"
				color="#a28445"
				fill="#A28445"
				transition={'all 0.3s'}
				_hover={{ color: '#81672e', fill: '#81672e' }}
			>
				{icon}
				<Box as="div" mx={2}>
					<Text
						fontSize={{ base: '12px' }}
						dir={text === contacts.address && lang === 'he' ? 'rtl' : 'ltr'}
					>
						{text || ''}
					</Text>
				</Box>
			</Link>
		</Box>
	);

	return (
		<Flex
			justifyContent="space-between"
			gap={gap}
			alignItems={{ base: 'none', lg: 'center' }}
			flexDirection={flexDir}
			w={'87%'}
		>
			<Box
				as="ul"
				display="flex"
				flexDirection={{ base: 'column', lg: 'row', xl: 'row' }}
				alignItems="flex-start"
				py={{ base: '12px', md: '0' }}
				gap={{ base: '18px', lg: '14px', xl: '16px' }}
			>
				{iconData(contacts).map(renderIconLink)}
			</Box>

			<TopMenu lang={lang} authToken={authToken} />
		</Flex>
	);
};

export default TopBar;
