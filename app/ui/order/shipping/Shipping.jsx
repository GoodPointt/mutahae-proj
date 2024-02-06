'use client';

import { useState } from 'react';

import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';

import IconOrderArrow from '../../svg/OrderArrowDown';
import IconOrderArrowUp from '../../svg/OrderArrowUp';

const Shipping = ({
	dictionary,
	arrayCities,
	setSelectedCity,
	selectedCity,
	setEnteredAddress,
	enteredAddress,
}) => {
	const [isOpenSelect, setIsOpenSelect] = useState(false);

	const handleMenuOpen = () => {
		setIsOpenSelect(true);
	};

	const handleMenuClose = () => {
		setIsOpenSelect(false);
	};

	const handleCustomCityChange = e => {
		setEnteredAddress(e.target.value);
		setSelectedCity('');
	};

	return (
		<>
			<Box
				borderRadius={'2px'}
				border={'1px solid #3B3D46'}
				padding={'30px'}
				mt={'60px'}
			>
				<Flex
					flexDir={{ base: 'column', sm: 'row' }}
					justifyContent={'space-between'}
					alignItems={{ base: 'start', sm: 'center' }}
					marginBottom={'30px'}
				>
					<Heading
						as={'h3'}
						fontSize={'18px'}
						fontFamily={600}
						mb={{ base: '10px', sm: '0' }}
					>
						{dictionary.order.shippingTitle}
					</Heading>
					<Text fontSize={{ base: '12px', sm: '18px' }}>
						{dictionary.order.shippingDesc}
					</Text>
				</Flex>

				<Menu onOpen={handleMenuOpen} onClose={handleMenuClose}>
					<MenuButton
						as={Button}
						borderRadius={'2px'}
						bgColor={'#3B3D46'}
						borderColor={'transparent'}
						focusBorderColor="#a28445"
						width={'100%'}
						rightIcon={isOpenSelect ? <IconOrderArrowUp /> : <IconOrderArrow />}
						fontSize={'18px'}
						color={'#ffffff'}
						textAlign={'start'}
						border={'1px solid transparent'}
						_hover={{ border: '1px solid white' }}
						_expanded={{ borderColor: '#a28445', background: '#3B3D46' }}
					>
						{selectedCity
							? selectedCity
							: enteredAddress
							? enteredAddress
							: dictionary.order.select}
					</MenuButton>
					<MenuList
						maxHeight="270px"
						overflowY="auto"
						bg={'#181617'}
						borderRadius={'2px'}
						borderColor={'#a28445'}
						padding={0}
					>
						<Input
							type="text"
							value={enteredAddress}
							onChange={handleCustomCityChange}
							placeholder="Enter your address"
							bg={'#181617'}
							color={'#ffffff'}
							borderRadius={0}
							borderTop={'transparent'}
							borderLeft={'transparent'}
							borderRight={'transparent'}
							_hover={{
								backgroundColor: '#3b3d46',
							}}
						/>
						<MenuItem
							bg={'#181617'}
							borderRadius={0}
							key={-1}
							_hover={{ backgroundColor: '#3b3d46' }}
							onClick={() => {
								setSelectedCity('');
								setEnteredAddress('');
							}}
						>
							{dictionary.order.select}
						</MenuItem>

						{arrayCities.map((item, index) => (
							<MenuItem
								bg={'#181617'}
								borderRadius={0}
								key={index}
								_hover={{ backgroundColor: '#3b3d46' }}
								onClick={e => {
									setSelectedCity(e.target.textContent);
								}}
							>
								{item.cityName}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Box>
		</>
	);
};

export default Shipping;
