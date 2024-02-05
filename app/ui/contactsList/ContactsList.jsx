import { Box, Flex, Link, Text } from '@chakra-ui/react';

import { iconData } from '@/app/lib/data';

const ContactsList = ({ contacts, lang, inFooter = false }) => {
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
						fontSize={!inFooter ? '12px' : '16px'}
						dir={text === contacts.address && lang === 'he' ? 'rtl' : 'ltr'}
					>
						{text || ''}
					</Text>
				</Box>
			</Link>
		</Box>
	);

	return (
		<Flex alignItems={{ base: 'none', lg: 'center' }} pb={'6px'}>
			<Box
				as="ul"
				display="flex"
				flexDir={inFooter && 'column'}
				alignItems="flex-start"
				gap={{ lg: '14px', xl: '16px' }}
			>
				{iconData(contacts).map(renderIconLink)}
			</Box>
		</Flex>
	);
};

export default ContactsList;
