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

import './styles.css';

const Shipping = ({
	dictionary,
	arrayCities,
	setSelectedCity,
	selectedCity,
	setCityId,
	userAddress,
	setOwnCity,
	ownCity,
	setEnteredAddress,
	enteredAddress,
}) => {
	const [isOpenSelect, setIsOpenSelect] = useState(false);

	const addressList = userAddress?.data;

	const handleMenuOpen = () => {
		setIsOpenSelect(true);
	};

	const handleMenuClose = () => {
		setIsOpenSelect(false);
	};

	const handleCustomCityChange = e => {
		setSelectedCity('');
		setOwnCity('');
		setCityId(null);
		setEnteredAddress(e.target.value);
	};

	const filteredAddresses = arrayCities.filter(({ cityName }) => {
		const formatedAddress = enteredAddress.toLowerCase();

		return cityName.toLowerCase().includes(formatedAddress);
	});

	const formatAddress = address => {
		const { attributes } = address;
		const { region, city, street, app, index } = attributes;
		let fullAddress = '';

		if (region) {
			fullAddress += region;
			if (city || street || app || index) {
				fullAddress += ', ';
			}
		}
		if (street) {
			fullAddress += street;
			if (city || app || index) {
				fullAddress += ' ';
			}
		}
		if (app) {
			fullAddress += app;
			if (city || index) {
				fullAddress += ', ';
			}
		}
		if (city && index) {
			fullAddress += city + ', ';
		} else if (city) {
			fullAddress += city;
			if (index) {
				fullAddress += ', ';
			}
		}
		if (index) {
			fullAddress += index;
		}

		return fullAddress;
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
						fontSize={'16px'}
						height={'auto'}
						pt={'10px'}
						pb={'10px'}
						color={'#ffffff'}
						textAlign={'start'}
						border={'1px solid transparent'}
						_hover={{ border: '1px solid white' }}
						_expanded={{ borderColor: '#a28445', background: '#3B3D46' }}
						style={{
							whiteSpace: 'normal',
							overflow: 'visible',
							textOverflow: 'clip',
						}}
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
						css={{
							'&::-webkit-scrollbar': {
								width: '3px',
							},
							'&::-webkit-scrollbar-thumb': {
								background: '#A28445',
								borderRadius: '2px',
							},
						}}
					>
						<Input
							type="text"
							value={enteredAddress}
							onChange={handleCustomCityChange}
							placeholder={dictionary.order.ownCity}
							bg={'#181617'}
							color={'#ffffff'}
							focusBorderColor="#a28445"
							maxLength={50}
							borderRadius={0}
							borderTop={'transparent'}
							borderLeft={'transparent'}
							borderRight={'transparent'}
							style={{ overflowY: 'auto', maxHeight: '200px' }}
							_hover={{
								backgroundColor: '#3b3d46',
							}}
						/>
						<MenuItem
							bg={'#181617'}
							borderRadius={0}
							key={-1}
							fontSize={'16px'}
							_hover={{ backgroundColor: '#3b3d46' }}
							onClick={() => {
								setSelectedCity(dictionary.order.self);
								setOwnCity('');
								setCityId(null);
								setEnteredAddress('');
							}}
						>
							{dictionary.order.self}
						</MenuItem>
						{addressList &&
							addressList.map((address, i) => {
								const fullAddress = formatAddress(address);

								return (
									<MenuItem
										bg={'#181617'}
										borderRadius={0}
										key={address + i}
										fontSize={'16px'}
										_hover={{ backgroundColor: '#3b3d46' }}
										onClick={() => {
											setSelectedCity(fullAddress);
											setCityId(address.id);
											setOwnCity(address.attributes.city);
											setEnteredAddress('');
										}}
										style={{
											whiteSpace: 'normal',
											overflow: 'visible',
											textOverflow: 'clip',
										}}
									>
										{fullAddress}
									</MenuItem>
								);
							})}
						{filteredAddresses.map((item, index) => (
							<MenuItem
								bg={'#181617'}
								borderRadius={0}
								key={index}
								fontSize={'16px'}
								_hover={{ backgroundColor: '#3b3d46' }}
								onClick={() => {
									setSelectedCity(item.cityName);
									setOwnCity('');
									setCityId(item.id);
									setEnteredAddress('');
								}}
							>
								{item.cityName}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
				{ownCity || enteredAddress ? (
					<Text mt={'10px'} fontSize={'14px'}>
						{dictionary.order.message}
					</Text>
				) : null}
			</Box>
		</>
	);
};

export default Shipping;
