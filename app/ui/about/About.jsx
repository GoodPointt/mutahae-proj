'use client';
import {
	Box,
	Button,
	Heading,
	List,
	ListItem,
	Text,
	useDisclosure,
} from '@chakra-ui/react';

import FormContact from '../modalContact/ModalContact';
import ModalWindow from '../modalWindow/ModalWindow';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import TextLink from '../textLink/TextLink';

const About = ({ dictionary, contacts, lang }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<SectionWrapper bg="url('/img/about-background.jpg')">
				<Heading as={'h2'} textTransform={'uppercase'} mb={'44px'}>
					<Text as={'span'} color="#a28445">
						{dictionary.aboutUs.title.firstWord}&nbsp;
					</Text>
					{dictionary.aboutUs.title.secondWord}
				</Heading>
				<Box
					position={'relative'}
					py={'16px'}
					px={'24px'}
					_rtl={{
						_after: {
							right: 0,
						},
					}}
					_after={{
						display: ['block', 'block'],
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						h: '100%',
						w: '1px',
						bgColor: '#a28445',
					}}
					fontSize={{ base: '14px', sm: '16px' }}
					w={{ base: '100%', lg: '75%', xl: '55%' }}
					ml={{ base: '0px', sm: '24px' }}
				>
					<List display={'flex'} flexDirection={'column'} gap={'24px'}>
						{dictionary?.aboutUs.main.map(el => (
							<ListItem key={el.text}>
								<Text>{el.text}</Text>
							</ListItem>
						))}
					</List>
					<Text mt={'32px'}>
						{dictionary.pageLinksText.catalog.fromAbout}
						<TextLink
							href={`/${lang}/${dictionary.pageLinksText.catalog.link}`}
						>
							{dictionary.pageLinksText.catalog.linkName}
						</TextLink>
					</Text>
					<Button
						bgColor={'#a28445'}
						color={'#fff'}
						_hover={{ bgColor: '#81672e' }}
						mt={'24px'}
						onClick={onOpen}
						borderRadius={'2px'}
					>
						{dictionary.buttons.contact}
					</Button>
				</Box>
			</SectionWrapper>
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<FormContact
					dictionary={dictionary}
					contacts={contacts}
					onClose={onClose}
				/>
			</ModalWindow>
		</>
	);
};

export default About;
