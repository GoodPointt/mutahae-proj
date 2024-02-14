import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import Btn from '../button/Btn';
import SuccessIcon from '../svg/SuccessIcon';

const SuccessSubmitMsg = ({ onClick, dictionary }) => {
	return (
		<Flex align={'center'} justify={'center'} flexDir={'column'} gap={4}>
			<SuccessIcon />
			<Text fontSize={'24px'} textAlign={'center'}>
				{dictionary.formContact.toasts.form.successMsg1}
			</Text>
			<Text fontSize={'24px'} textAlign={'center'}>
				{dictionary.formContact.toasts.form.successMsg2}
			</Text>
			<Text fontSize={'24px'} textAlign={'center'}>
				{dictionary.formContact.toasts.form.successMsg3}
			</Text>
			<Btn onClick={onClick}>Ok</Btn>
		</Flex>
	);
};

export default SuccessSubmitMsg;
