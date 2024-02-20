'use client';

import { useRef, useState } from 'react';

import {
	Button,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from '@chakra-ui/react';

import Search from '../../svg/Search';

import { useDebouncedCallback } from 'use-debounce';

const SearchInCatalog = ({ dictionary, lang, setQuery }) => {
	const [isSearch, setIsSearch] = useState(false);

	const ref = useRef();

	const handleSearch = useDebouncedCallback(e => {
		if (e.target.value) {
			e.target.value.length > 0 && setQuery(e.target.value);
		} else {
			setQuery(null);
		}
	}, 300);

	const clearSearch = () => {
		ref?.current?.reset(), setQuery(null);
	};

	return (
		<FormControl id="name" display={{ base: 'none', md: 'flex' }}>
			<InputGroup
				as={'form'}
				ref={ref}
				borderColor="transparent"
				borderBottomColor={'#ccc'}
				width={{ base: '100%', md: '25%' }}
				alignItems={'center'}
				pb={'28px'}
			>
				{lang !== 'he' ? (
					<>
						<InputRightElement right={'30px'}>
							<Button
								variant={'ghost'}
								color={'#ccc'}
								fontSize={'15px'}
								fontWeight={'500'}
								_active={{ bg: 'transpaernt' }}
								_hover={{ bg: 'transpaernt' }}
								onClick={() => clearSearch()}
							>
								{!isSearch ? '' : dictionary.searchField.clear}
							</Button>
						</InputRightElement>
					</>
				) : (
					<InputLeftElement left={'30px'}>
						<Button
							variant={'ghost'}
							color={'#ccc'}
							fontSize={'15px'}
							fontWeight={'500'}
							_active={{ bg: 'transpaernt' }}
							_hover={{ bg: 'transpaernt' }}
							onClick={() => clearSearch()}
						>
							{!isSearch ? '' : dictionary.searchField.clear}
						</Button>
					</InputLeftElement>
				)}
				{lang === 'he' ? (
					<InputRightElement fill={'#ccc'}>
						<Search />
					</InputRightElement>
				) : (
					<InputLeftElement fill={'#ccc'}>
						<Search />
					</InputLeftElement>
				)}
				<Input
					placeholder={dictionary.searchField.search}
					onChange={handleSearch}
					focusBorderColor="transparent"
					_focus={{ borderBottom: ' 1px solid #A28445' }}
					borderRadius={'2px'}
					ringColor={'transparent'}
					_hover={{
						// border: '1px solid transparent',
						outline: '1px solid transparent',
						outlineOffset: 'none',
					}}
					onFocus={() => setIsSearch(true)}
					onBlur={() => setIsSearch(false)}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					type="text"
					size="md"
					bgColor={'transparent'}
					name="name"
					px={10}
				/>
			</InputGroup>
		</FormControl>
	);
};

export default SearchInCatalog;
