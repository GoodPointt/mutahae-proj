'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Flex, Text } from '@chakra-ui/react';

import HomeIcon from '../../svg/HomeIcon';

const BreadcrumbBar = ({ productTitle }) => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(segment => segment !== '');
	const lang = pathSegments[0];

	return (
		<>
			{pathSegments.length > 0 && (
				<Flex
					alignItems={'start'}
					mb={'20px'}
					fontSize={'14px'}
					textColor={'#A28445'}
				>
					<span>
						<Link href={`/${lang}`}>
							<HomeIcon />
						</Link>
					</span>
					{pathSegments.map((segment, index) => (
						<Box
							as="li"
							textTransform={'capitalize'}
							listStyleType={'none'}
							key={index}
						>
							{index < pathSegments.length - 1 && segment !== lang && (
								<Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
									{segment}
								</Link>
							)}
							{index === pathSegments.length - 1 && (
								<Text as={'span'} textColor={'#666'}>
									{productTitle}
								</Text>
							)}
							{index < pathSegments.length - 1 && (
								<Text as={'span'} mx={'10px'}>
									/
								</Text>
							)}
						</Box>
					))}
				</Flex>
			)}
		</>
	);
};

export default BreadcrumbBar;
