import { useRef } from 'react';
import Link from 'next/link';

import { Box, Button } from '@chakra-ui/react';

import AuthProfileIcon from '../../svg/AuthProfileIcon';
import BagNavIcon from '../../svg/BagNavIcon';
import FavoriteNavIcon from '../../svg/FavoriteNavIcon';
import ProfileNavIcon from '../../svg/ProfileNavIcon';
import Search from '../../svg/Search';

const TopMenu = ({
	lang,
	authToken,
	serchRef,
	bagRef,
	displayIcons = ['SEARCH_ICON', 'PROFILE_ICON', 'FAVORITE_ICON', 'BAG_ICON'],
	display = 'none',
}) => {
	//убрать потом юзРеф когда будут рефы с поиска и сумки
	const refSearch = useRef() || serchRef;
	const refBag = useRef() || bagRef;

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

	// const handleClick = id => {
	// 	switch (id) {
	// 		case 'SEARCH_ICON':
	// 			console.log('Ref for Search:', refSearch.current);
	// 			break;
	// 		case 'PROFILE_ICON':
	// 			console.log('Profile:');
	// 			break;
	// 		case 'FAVORITE_ICON':
	// 			console.log('Favorite:');
	// 			break;
	// 		case 'BAG_ICON':
	// 			console.log('Ref for Bag:', refBag.current);
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	return (
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
								// onClick={() => handleClick(id)}
								ref={
									id === 'SEARCH_ICON'
										? refSearch
										: id === 'BAG_ICON'
										? refBag
										: null
								}
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
	);
};

export default TopMenu;
