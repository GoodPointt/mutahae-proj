'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import { useLocalBag } from '@/app/lib/hooks/useLocalBag';

import Bag from '../../bag/Bag';
import Modal from '../../modal/Modal';
import SearchField from '../../search/searchField/SearchField';
import AuthProfileIcon from '../../svg/AuthProfileIcon';
import BagNavIcon from '../../svg/BagNavIcon';
import FavoriteNavIcon from '../../svg/FavoriteNavIcon';
import ProfileNavIcon from '../../svg/ProfileNavIcon';
import Search from '../../svg/Search';

import axios from 'axios';
import { setCookie } from 'cookies-next';
import { parseAsFloat, useQueryState } from 'nuqs';

const ToolBar = ({
	lang,
	hasToken,
	bagData,
	dictionary,
	bagLength,
	favorites,
	favId,
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
	//const favsLocal = useClientSideState('favs', 0);
	const [favorite] = useQueryState(
		'favs',
		parseAsFloat.withDefault(
			typeof window !== 'undefined' && hasToken
				? JSON.parse(localStorage.getItem('favs'))?.length
				: 0
		)
	);

	useEffect(() => {
		if (favId) setCookie('favId', favId);
	}, [favId]);
	const [localGoods] = useLocalBag('localBag');

	const totalPrice = localGoods.reduce((acc, { count, good: { data } }) => {
		return acc + data.attributes.price * count;
	}, 0);

	useEffect(() => {
		typeof window !== 'undefined' &&
			localStorage.setItem('favs', JSON.stringify(favorites));
	}, [favorites]);

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
				{favorite !== 0 && (
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
						{favorite}
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

	const handleModalBagClose = () => {
		const flatten = localGoods.map(({ count, good: { data } }) => ({
			good: data,
			count,
		}));

		if (hasToken) {
			const url =
				process.env.NEXT_PUBLIC_STRAPI_API_URL +
				`/api/bags/${bagData.id}?populate=goods`;

			try {
				axios.put(url, { data: { goods: flatten, bagPrice: totalPrice } });
			} catch (error) {
				console.error(error);
			}
		}

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
			<Modal
				isOpen={isOpen}
				onClose={variant === 'BAG_ICON' ? handleModalBagClose : handleClose}
				lang={lang}
			>
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
