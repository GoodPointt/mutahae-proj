'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import {
	Box,
	Button,
	Divider,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from '@chakra-ui/react';

import { fetchProductsByQuery } from '../../../lib/api/instance';

import DeleteSearch from '../../svg/DeleteSearch';
import FilteredProduct from '../filteredProduct/FilteredProduct';

import { useDebouncedCallback } from 'use-debounce';

const SearchField = ({ lang, onClose, setQuery, query, dictionary }) => {
	const [filter, setFilter] = useState('');

	const [filteredProducts, setFilteredProducts] = useState('');

	const ref = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const filteredProducts = await fetchProductsByQuery(query);
				setFilteredProducts(filteredProducts);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchData();
	}, [query]);

	const handleSearch = useDebouncedCallback(e => {
		if (e.target.value) {
			e.target.value.length > 0 && setQuery(e.target.value);
			setFilter(e.target.value);
		} else {
			setQuery(null);
			setFilter('');
		}
	}, 300);

	const clearSearch = () => {
		ref?.current?.reset();
		setQuery(null);
		setFilter('');
	};

	return (
		<>
			<InputGroup
				as={'form'}
				ref={ref}
				display={'flex'}
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
					bgColor={'base'}
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

				<InputRightElement position={'relative'}>
					<IconButton
						isRound={true}
						colorScheme="ghost"
						aria-label="clear search"
						icon={<DeleteSearch />}
						_hover={{ color: 'accent' }}
						onClick={clearSearch}
					/>
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

			{filteredProducts.length === 0 && query !== '' && filter !== '' && (
				<Text>{dictionary.searchField.noResultText}</Text>
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
