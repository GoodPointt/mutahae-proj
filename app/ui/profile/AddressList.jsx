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
}) => {
	return (
		<Box mb="40px" borderBottom="1px solid #3B3D46" pb="30px" key={id}>
			<List mb="20px">
				{region && <ListItem fontSize="16px">{region}</ListItem>}
				{city && <ListItem fontSize="16px">{city}</ListItem>}
				{street && <ListItem fontSize="16px">{street}</ListItem>}
				{app && <ListItem fontSize="16px">{app}</ListItem>}
				{index && <ListItem fontSize="16px">{index}</ListItem>}
			</List>
			<DeleteBtn id={id} dictionary={dictionary} />
		</Box>
	);
};
