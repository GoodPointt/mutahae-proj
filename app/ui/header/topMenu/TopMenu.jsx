'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Box, Button, useDisclosure } from '@chakra-ui/react';

import Bag from '../../bag/Bag';
import Modal from '../../modal/Modal';
import SearchField from '../../search/searchField/SearchField';
import AuthProfileIcon from '../../svg/AuthProfileIcon';
import BagNavIcon from '../../svg/BagNavIcon';
import FavoriteNavIcon from '../../svg/FavoriteNavIcon';
import ProfileNavIcon from '../../svg/ProfileNavIcon';
import Search from '../../svg/Search';

import { useQueryState } from 'nuqs';

const TopMenu = ({
	lang,
	authToken,
	displayIcons = [
		'SEARCH_ICON',
		'PROFILE_ICON',
		authToken && 'FAVORITE_ICON',
		'BAG_ICON',
	],
	display = 'none',
	bagData,
	dictionary,
}) => {
	const { isOpen = false, onOpen, onClose } = useDisclosure();
	//убрать потом юзРеф когда будут рефы с поиска и сумки
	const [variant, setVariant] = useState();
	const [query, setQuery] = useQueryState('query');

	const profilePathname = authToken
		? `/${lang}/profile`
		: `/${lang}/auth/login`;

	// поменять на страницу фаворитов
	const favoritePathname = `/${lang}`;

	const mapIcon = {
		SEARCH_ICON: <Search />,
		PROFILE_ICON: authToken ? (
			<Link href={profilePathname}>
				<AuthProfileIcon />
			</Link>
		) : (
			<Link href={profilePathname}>
				<ProfileNavIcon />
			</Link>
		),
		FAVORITE_ICON: authToken && (
			<Link href={favoritePathname}>
				<FavoriteNavIcon />
			</Link>
		),
		BAG_ICON: <BagNavIcon />,
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
			<Box
				as={'ul'}
				display={{ base: display, lg: 'flex' }}
				gap={'4px'}
				alignItems={'center'}
			>
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
									<Box w={'24px'} h={'24px'}>
										{item}
									</Box>
								</Button>
							</Box>
						);
					} else {
						return null;
					}
				})}
			</Box>
			<Modal isOpen={isOpen} onClose={handleClose} lang={lang}>
				{variant === 'BAG_ICON' && (
					<Bag bagData={bagData} authToken={authToken} />
				)}
				{variant === 'SEARCH_ICON' && (
					<SearchField
						lang={lang}
						onClose={handleClose}
						query={query}
						setQuery={setQuery}
						dictionary={dictionary}
					/>
				)}
			</Modal>
		</>
	);
};

export default TopMenu;
