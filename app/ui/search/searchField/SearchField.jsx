'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import {
	Box,
	Button,
	Divider,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from '@chakra-ui/react';

import { fetchProductsByQuery } from '../../../lib/api/instance';

import ArrowLeft from '../../svg/ArrowLeft';
import ArrowRight from '../../svg/ArrowRight';
import FilteredProduct from '../filteredProduct/FilteredProduct';

import { useDebouncedCallback } from 'use-debounce';

const SearchField = ({ lang, onClose, setQuery, query, dictionary }) => {
	const [noResult, setNoResult] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const ref = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const filteredProducts = await fetchProductsByQuery(query, lang);
				if (filteredProducts.length === 0 && query) {
					setQuery(null);

					setFilteredProducts(filteredProducts);
					setNoResult(true);

					return;
				}
				setNoResult(false);
				setFilteredProducts(filteredProducts);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};
		if (query !== null) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	const handleSearch = useDebouncedCallback(e => {
		if (e.target.value) {
			e.target.value.length > 0 && setQuery(e.target.value);
		} else {
			setQuery(null);
		}
	}, 300);

	const clearSearch = () => {
		ref?.current?.reset();
		setQuery(null);
	};

	return (
		<>
			<InputGroup
				as={'form'}
				ref={ref}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<Input
					height={0}
					pt={'25px'}
					pb={'25px'}
					pl={0}
					fontSize={'16px'}
					fontWeight={500}
					lineHeight={1}
					type="text"
					placeholder={dictionary.searchField.search}
					border={'none'}
					onChange={handleSearch}
					_placeholder={{ color: '#808080' }}
					_active={{ outlineColor: 'transparent' }}
					_focus={{
						outlineColor: 'transparent',
					}}
					_focusVisible={{
						borderColor: 'transparent',
						boxShadow: 'none',
					}}
				/>

				<InputRightElement
					position={'relative'}
					style={
						lang === 'he' ? { marginLeft: '30px' } : { marginRight: '30px' }
					}
				>
					<Button
						colorScheme="ghost"
						aria-label="clear search"
						_hover={{ color: 'accent' }}
						onClick={clearSearch}
						color={'grey'}
						fontSize={'16px'}
						fontWeight={500}
						lineHeight={1}
					>
						{dictionary.searchField.clear}
					</Button>
				</InputRightElement>
			</InputGroup>

			{filteredProducts.length > 0 && query !== '' && (
				<Divider borderColor={'#A28445'} mb={'30px'} opacity={1} />
			)}

			{filteredProducts.length > 0 && query !== '' && (
				<Box as="ul" display={'flex'} flexDir={'column'} rowGap={'30px'}>
					{filteredProducts.slice(0, 6).map(product => (
						<FilteredProduct
							key={product.id}
							product={product.attributes}
							lang={lang}
						/>
					))}
				</Box>
			)}

			{noResult && (
				<Flex
					flexDir={'column'}
					gap={'30px'}
					justifyContent={'center'}
					alignItems={'center'}
					p={'30px'}
					pb={0}
				>
					<Text textAlign={'center'} py={'40px'}>
						{dictionary.searchField.noResultText}
					</Text>
					<Button
						pos={'relative'}
						variant={'link'}
						textColor={'#fff'}
						borderRadius={'0px'}
						_after={{
							content: '""',
							pos: 'absolute',
							bottom: '-5px',
							left: 0,
							display: 'block',
							h: '1px',
							w: '100%',
							bgColor: '#81672e',
							opacity: 0,
						}}
						stroke={'#fff'}
						rightIcon={lang === 'en' ? <ArrowRight /> : <ArrowLeft />}
						_hover={{
							color: '#81672e',
							stroke: '#81672e',
							_after: { opacity: 1 },
						}}
						onClick={onClose}
					>
						<Link
							href={`/catalog`}
							style={{
								display: 'flex',
								width: '100%',
								height: '100%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{dictionary.buttons.emptyBagLink}
						</Link>
					</Button>
				</Flex>
			)}

			{filteredProducts.length > 0 && (
				<Button
					as={Link}
					href={`/${lang}/catalog?query=${query}`}
					bgColor={'#A28445'}
					display={'flex'}
					justifyContent={'center'}
					color={'white'}
					transition={'all 0.3s'}
					_hover={{ bgColor: '#81672e' }}
					borderRadius={'2px'}
					width={'100%'}
					mt={'30px'}
					onClick={onClose}
				>
					{dictionary.searchField.button}
				</Button>
			)}
		</>
	);
};

export default SearchField;
