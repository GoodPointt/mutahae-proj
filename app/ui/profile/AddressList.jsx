'use client';

import { Box, List, ListItem } from '@chakra-ui/react';

import { DeleteBtn } from './deleteBtn/DeleteBtn';

export const AddressList = ({
	region,
	city,
	street,
	app,
	index,
	id,
	dictionary,
	addressDictionary,
}) => {
	return (
		<Box mb="40px" borderBottom="1px solid #3B3D46" pb="30px" key={id}>
			<List display={'flex'} gap={'6px'} mb="20px" flexWrap={'wrap'}>
				<ListItem display={'inline-flex'} gap={'6px'}>
					{region && <Box fontSize="16px">{region}, </Box>}
					{city && <Box fontSize="16px">{city}, </Box>}
				</ListItem>
				<ListItem display={'inline-flex'} gap={'6px'}>
					{street && (
						<Box fontSize="16px">
							{addressDictionary.street} {street},{' '}
						</Box>
					)}
					{app && (
						<Box fontSize="16px">
							{addressDictionary.app} {app},{' '}
						</Box>
					)}
				</ListItem>
				{index && <ListItem fontSize="16px">{index}</ListItem>}
			</List>
			<DeleteBtn id={id} dictionary={dictionary} />
		</Box>
	);
};
