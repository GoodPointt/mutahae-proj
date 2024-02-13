'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import Bag from '../../bag/Bag';
import Modal from '../../modal/Modal';
import SearchField from '../../search/searchField/SearchField';
import AuthProfileIcon from '../../svg/AuthProfileIcon';
import BagNavIcon from '../../svg/BagNavIcon';
import FavoriteNavIcon from '../../svg/FavoriteNavIcon';
import ProfileNavIcon from '../../svg/ProfileNavIcon';
import Search from '../../svg/Search';

import { useQueryState } from 'nuqs';

const ToolBar = ({
	lang,
	hasToken,
	bagData,
	dictionary,
	bagLength,
	favoritesLength,
	displayIcons = [
		'SEARCH_ICON',
		'PROFILE_ICON',
		hasToken && 'FAVORITE_ICON',
		'BAG_ICON',
	],
}) => {
	const { isOpen = false, onOpen, onClose } = useDisclosure();
	const [variant, setVariant] = useState();
	const [query, setQuery] = useQueryState('query');

	const mapIcon = {
		SEARCH_ICON: <Search />,
		PROFILE_ICON: hasToken ? (
			<Link href={`/${lang}/profile`}>
				<AuthProfileIcon />
			</Link>
		) : (
			<Link href={`/${lang}/profile`}>
				<ProfileNavIcon />
			</Link>
		),
		FAVORITE_ICON: hasToken && (
			<Link
				href={`/${lang}/profile/favorites`}
				style={{ position: 'relative' }}
			>
				<FavoriteNavIcon />
				{favoritesLength !== 0 && (
					<Box
						pos={'absolute'}
						borderRadius={'50%'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						bgColor={'red'}
						top={'-4px'}
						w={'12px'}
						h={'12px'}
						right={lang === 'he' ? null : '-4px'}
						left={lang === 'he' ? '-4px' : null}
						fontSize={'10px'}
						color={'#fff'}
					>
						{favoritesLength}
					</Box>
				)}
			</Link>
		),
		BAG_ICON: (
			<>
				<BagNavIcon />
				{bagLength !== 0 && (
					<Box
						as="span"
						pos={'absolute'}
						borderRadius={'50%'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						bgColor={'red'}
						top={'-4px'}
						w={'12px'}
						h={'12px'}
						right={lang === 'he' ? null : '-4px'}
						left={lang === 'he' ? '-4px' : null}
						fontSize={'10px'}
						color={'#fff'}
					>
						{bagLength}
					</Box>
				)}
			</>
		),
	};

	const handleClick = id => {
		switch (id) {
			case 'SEARCH_ICON':
				onOpen();
				break;
			case 'PROFILE_ICON':
				break;
			case 'FAVORITE_ICON':
				break;
			case 'BAG_ICON':
				onOpen();
				break;
			default:
				break;
		}
		setVariant(id);
	};

	const handleClose = () => {
		setQuery(null);
		onClose();
	};

	return (
		<>
			<Flex as={'ul'} gap={'4px'} alignItems={'center'}>
				{Object.entries(mapIcon).map(([id, item], idx) => {
					if (displayIcons.includes(id)) {
						return (
							<Box
								as="li"
								key={idx}
								_hover={{ fill: '#81672e', stroke: '#81672e' }}
								fill={'#A28445'}
								stroke={'#A28445'}
								p={'0'}
								w={'45px'}
								h={'45px'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}
							>
								<Button
									variant={'ghost'}
									_hover={{ bg: 'none' }}
									onClick={() => handleClick(id)}
								>
									<Box w={'24px'} h={'24px'} pos={'relative'}>
										{item}
									</Box>
								</Button>
							</Box>
						);
					} else {
						return null;
					}
				})}
			</Flex>
			<Modal isOpen={isOpen} onClose={handleClose} lang={lang}>
				{variant === 'BAG_ICON' && (
					<Bag
						bagData={bagData}
						hasToken={hasToken}
						onClose={onClose}
						dictionary={dictionary}
					/>
				)}
				{variant === 'SEARCH_ICON' && (
					<SearchField
						lang={lang}
						onClose={onClose}
						query={query}
						setQuery={setQuery}
						dictionary={dictionary}
					/>
				)}
			</Modal>
		</>
	);
};

export default ToolBar;
