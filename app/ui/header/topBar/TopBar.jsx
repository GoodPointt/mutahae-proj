import { fetchContacts } from '@/app/lib/api/instance';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
import LocaleSwitcher from '../localeSwitcher/LocaleSwitcher';

const TopBar = async ({ lang, flexDir = 'row', gap = '0' }) => {
	const { data } = await fetchContacts(lang);
	const { attributes } = data[0];
	const { address, email, phone } = attributes;

	const iconLink = (icon, text, href) => (
		<Link
			href={href}
			display="flex"
			alignItems="center"
			color="#a28445"
			transition={'all 0.3s'}
			_hover={{ color: '#81672e' }}>
			{icon}
			<Box
				as="div"
				mx={2}>
				<Text fontSize={{ base: '12px', lg: '14px', xl: '15px' }}>{text}</Text>
			</Box>
		</Link>
	);

	return (
		<Flex
			justifyContent="space-between"
			gap={gap}
			alignItems={'center'}
			flexDirection={flexDir}>
			<Box
				as="div"
				display="flex"
				flexDirection={{ base: 'column', lg: 'row', xl: 'row' }}
				alignItems={'flex-start'}
				py={{ base: '12px' }}
				gap={{ base: '18px', lg: '14px', xl: '16px' }}>
				{iconLink(<FaLocationDot size="22" />, address, address)}
				{iconLink(<FaPhone size="22" />, phone, `tel:${phone}`)}
				{iconLink(<FaEnvelope size="22" />, email, `mailto:${email}`)}
			</Box>
			<LocaleSwitcher />
		</Flex>
	);
};

export default TopBar;
