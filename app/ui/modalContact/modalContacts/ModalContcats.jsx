import {
	Box,
	Heading,
	HStack,
	IconButton,
	Link,
	Text,
	VStack,
} from '@chakra-ui/react';

import EmailIcon from '../../svg/EmailIcon';
import FacebookIcon from '../../svg/FacebookIcon';
import InstagramIcon from '../../svg/InstagramIcon';
import LocationIcon from '../../svg/LocationIcon';
import PhoneIcon from '../../svg/PhoneIcon';
import Tg from '../../svg/Tg';
import Viber from '../../svg/Viber';
import WhatsApp from '../../svg/WhatsApp';

const ModalContacts = ({ contacts, dictionary, lang }) => {
	return (
		<Box>
			<Heading as={'h4'}>{dictionary.formContact.title}</Heading>
			<Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
				{dictionary.formContact.text}
			</Text>
			<Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
				<VStack pl={0} spacing={0} alignItems="flex-start">
					<Link
						display={'flex'}
						gap={2}
						borderRadius={'5px'}
						p={2}
						href={`tel:+${contacts.phone}`}
						size="md"
						minH="48px"
						width="100%"
						color="#DCE2FF"
						transition="all 300ms ease"
						_hover={{
							color: '#a68640',
							transform: 'translateX(3px)',
						}}
						fill="#a28445"
					>
						<PhoneIcon />
						<Text
							display="flex"
							flexDir={lang === 'he' ? 'row-reverse' : 'row'}
						>
							<Box as="span">+</Box>
							<Box as="span">{contacts.phone}</Box>
						</Text>
					</Link>

					<Link
						display={'flex'}
						gap={2}
						borderRadius={'5px'}
						p={2}
						href={`mailto:${contacts.mail}`}
						size="md"
						minH="48px"
						width="100%"
						color="#DCE2FF"
						transition="all 300ms ease"
						_hover={{
							color: '#a68640',
							transform: 'translateX(3px)',
						}}
						fill="#a28445"
					>
						<EmailIcon />
						<Text>{contacts.email}</Text>
					</Link>

					<Link
						href={contacts.addressUrl}
						rel={'noopener noreferrer nofollow'}
						display={'flex'}
						gap={1}
						borderRadius={'5px'}
						p={2}
						size="md"
						minH="48px"
						width="100%"
						color="#DCE2FF"
						transition="all 300ms ease"
						_hover={{
							color: '#a68640',
							transform: 'translateX(3px)',
						}}
						style={{ whiteSpace: 'break-spaces' }}
						fill="#a28445"
					>
						<LocationIcon />
						<Text>{contacts.address}</Text>
					</Link>
				</VStack>
			</Box>
			<HStack spacing={2} px={0} alignItems="flex-start" p={3}>
				<IconButton
					as={'a'}
					rel={'noopener noreferrer nofollow'}
					aria-label="facebook"
					icon={<FacebookIcon />}
					href={contacts.fb}
					target="_blank"
					color={'#a28445'}
					variant="ghost"
					size="md"
					isRound={true}
					_hover={{
						bg: '#333331',
						transform: 'translateY(-3px) translateX(3px)',
					}}
					transition="all 500ms ease"
				/>
				<IconButton
					as={'a'}
					rel={'noopener noreferrer nofollow'}
					aria-label="instagram"
					target="_blank"
					icon={<InstagramIcon size="28px" />}
					href={contacts.insta}
					color={'#a28445'}
					variant="ghost"
					size="md"
					isRound={true}
					_hover={{
						bg: '#333331',
						transform: 'translateY(-3px) translateX(3px)',
					}}
					transition="all 500ms ease"
				/>
				<IconButton
					as={'a'}
					rel={'noopener noreferrer nofollow'}
					aria-label="whatsapp"
					icon={<WhatsApp />}
					href={contacts.watsapp}
					target="_blank"
					color={'#a28445'}
					variant="ghost"
					size="md"
					isRound={true}
					_hover={{
						bg: '#333331',
						transform: 'translateY(-3px) translateX(3px)',
					}}
					transition="all 500ms ease"
				/>
				<IconButton
					as={'a'}
					rel={'noopener noreferrer nofollow'}
					aria-label="telegram"
					icon={<Tg />}
					href={contacts.tg}
					target="_blank"
					color={'#a28445'}
					variant="ghost"
					size="md"
					isRound={true}
					_hover={{
						bg: '#333331',
						transform: 'translateY(-3px) translateX(5px)',
					}}
					transition="all 500ms ease"
				/>
				<IconButton
					fill={'red'}
					as={'a'}
					rel={'noopener noreferrer nofollow'}
					aria-label="viber"
					icon={<Viber />}
					href={contacts.viber}
					target="_blank"
					color={'#a28445'}
					variant="ghost"
					size="md"
					isRound={true}
					_hover={{
						bg: '#333331',
						transform: 'translateY(-3px) translateX(5px)',
					}}
					transition="all 500ms ease"
				/>
			</HStack>
		</Box>
	);
};

export default ModalContacts;
