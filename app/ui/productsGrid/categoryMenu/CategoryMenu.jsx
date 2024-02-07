import { useRef } from 'react';

import {
	Box,
	Button,
	Flex,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Portal,
} from '@chakra-ui/react';

import ArrowDown from '../../svg/ArrowDown';
import ArrowUp from '../../svg/ArrowUp';

const CategoryMenu = ({
	subCategories,
	id,
	setCategory,
	setSub_category,
	setPage,
	sub_category,
}) => {
	const initRef = useRef();

	return (
		<Popover closeOnBlur={true} placement="bottom" initialFocusRef={initRef}>
			{({ isOpen, onClose }) => (
				<>
					{subCategories.length > 0 && (
						<PopoverTrigger>
							<Button
								variant={'ghost'}
								_hover={{
									bg: 'none',
								}}
							>
								{isOpen ? <ArrowUp /> : <ArrowDown />}
							</Button>
						</PopoverTrigger>
					)}
					<Portal>
						<PopoverContent
							bg={'#191617'}
							border={'none'}
							alignItems={'center'}
						>
							<PopoverBody display={'flex'} flexDir={'column'}>
								<Flex as="ul" flexDir={'column'} gap={'4px'}>
									{subCategories.map(subCategory => (
										<Box as="li" key={subCategory.uid} width={'100%'}>
											<Button
												variant={'ghost'}
												fontSize={'16px'}
												fontWeight={'500'}
												transition={'all 0.3s'}
												_hover={{
													bg: 'none',
													transform: 'translateX(5px)',
													color: '#a98841',
												}}
												color={
													sub_category !== subCategory.uid ? 'white' : '#a28445'
												}
												onMouseDown={() => onClose()}
												onClick={() => {
													setCategory(id),
														setSub_category(subCategory.uid),
														setPage(1),
														onClose();
												}}
											>
												{subCategory.title}
											</Button>
										</Box>
									))}
								</Flex>
							</PopoverBody>
						</PopoverContent>
					</Portal>
				</>
			)}
		</Popover>
	);
};

export default CategoryMenu;
