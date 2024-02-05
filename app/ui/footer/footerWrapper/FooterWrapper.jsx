'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Flex, Text, useDisclosure } from '@chakra-ui/react';

import ContactsList from '../../contactsList/ContactsList';
import NavBar from '../../navbar/NavBar';
import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import SocialLinks from '../../socialLinks/SocialLinks';
import BottomBar from '../bottomBar/BottomBar';
import FooterProductsList from '../footerProductsList/ProductsList';

const FooterWrapper = ({ lang, dictionary, contacts, products }) => {
	const isRTL = lang === 'he';
	const { onClose } = useDisclosure();

	return (
		<SectionWrapper as={'footer'} bg="black">
			<Flex
				alignItems={{ base: 'center', md: 'flex-start' }}
				justifyContent={'space-between'}
				flexDirection={{ base: 'column', md: 'row' }}
				gap={{ base: '46px' }}
				mb={{ base: '46px', lg: '0' }}
			>
				<Flex flexDirection="column" gap={'38px'}>
					<Link href={'/' + lang}>
						<Image
							src={'/img/logo.png'}
							alt="logo"
							width="300"
							height="100"
							style={{
								objectFit: 'cover',
								width: 300,
								height: 100,
								display: 'block',
							}}
						/>
					</Link>
					<SocialLinks lang={lang} contacts={contacts} />
				</Flex>
				<Flex flexDirection={'column'} gap={'32px'}>
					<Text>{dictionary.footer.contacts}</Text>
					<ContactsList contacts={contacts} lang={lang} inFooter={true} />
				</Flex>

				<NavBar
					lang={lang}
					flexDir="column"
					dictionary={dictionary}
					onClose={onClose}
				/>
			</Flex>

			<Text
				mb={{ base: '32px', lg: '28px' }}
				color={'#a28445'}
				fontSize={'22px'}
				textAlign={{ base: 'center', md: 'unset' }}
			>
				{dictionary.footer.products}:
			</Text>
			<FooterProductsList products={products} lang={lang} />
			{}
			<Text fontSize={'14px'} textAlign={{ base: 'center', md: 'unset' }}>
				{!isRTL && <Text as={'span'}>©</Text>}
				2023 Mutag Haetz LTD. All rights reserved
				{isRTL && <Text as={'span'}>©</Text>}
			</Text>
			<BottomBar />
		</SectionWrapper>
	);
};

export default FooterWrapper;
