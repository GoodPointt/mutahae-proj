import {
	Box,
	Flex,
	Heading,
	Link,
	List,
	ListItem,
	Text,
} from '@chakra-ui/react';

import ContactForm from '../contactForm/ContactForm';
import GoogleMap from '../googleMap/GoogleMap';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import EmailIcon from '../svg/EmailIcon';
import LocationIcon from '../svg/LocationIcon';
import PhoneIcon from '../svg/PhoneIcon';

const Contact = ({ lang, dictionary, contacts }) => {
	const { addressUrl, address, phone, email } = contacts;

	return (
		<SectionWrapper
			bg={
				'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(25,25,25,1) 50%, rgba(0,0,0,1) 100%)'
			}
		>
			<Flex gap={30} flexDirection={{ base: 'column', lg: 'row' }}>
				<Box w="100%" maxW={{ base: '100%', lg: '300px' }}>
					<Heading textTransform="uppercase" mb="30px">
						{dictionary.formContact.sectionTitle}
					</Heading>
					<List mb="30px">
						{address && (
							<ListItem
								display="flex"
								gap="8px"
								alignItems="center"
								_hover={{
									cursor: 'pointer',
									color: '#b1b0b0',
								}}
								transition={'all 0.3s'}
								fill="#a28445"
							>
								<Box width={'28px'}>
									<LocationIcon />
								</Box>
								{addressUrl && address && (
									<Link
										_hover={{ textDecoration: 'none' }}
										href={addressUrl}
										rel={'noopener noreferrer nofollow'}
										target="_blank"
									>
										<Text>{address}</Text>
									</Link>
								)}
								{!addressUrl && address && <Text>{address}</Text>}
							</ListItem>
						)}
						<ListItem
							display="flex"
							gap="8px"
							alignItems="center"
							mt="10px"
							_hover={{
								cursor: 'pointer',
								color: '#b1b0b0',
							}}
							transition={'all 0.3s'}
							fill="#a28445"
						>
							<PhoneIcon />
							{phone && (
								<Link
									_hover={{ textDecoration: 'none' }}
									href={`tel:+${phone}`}
									display="flex"
									flexDir={lang === 'he' ? 'row-reverse' : 'row'}
								>
									<Box as="span">+</Box>
									{phone}
								</Link>
							)}
						</ListItem>
						<ListItem
							display="flex"
							gap="8px"
							alignItems="center"
							mt="10px"
							_hover={{
								cursor: 'pointer',
								color: '#b1b0b0',
							}}
							transition={'all 0.3s'}
							fill="#a28445"
						>
							<EmailIcon />
							{email && (
								<Link
									_hover={{ textDecoration: 'none' }}
									href={`mailto:${email}`}
								>
									{email}
								</Link>
							)}
						</ListItem>
					</List>
					<ContactForm dictionary={dictionary} />
				</Box>
				<Box flex={1}>
					<GoogleMap />
				</Box>
			</Flex>
		</SectionWrapper>
	);
};

export default Contact;
