'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Flex, Text } from '@chakra-ui/react';

import HomeIcon from '../../svg/HomeIcon';

const BreadcrumbBar = ({ productTitle, dictionary }) => {
	const pathSegments = pathname.split('/').filter(segment => segment !== '');
	const pathname = usePathname();
	const lang = pathSegments[0];

	return (
		<>
			{pathSegments.length > 0 && (
				<Flex alignItems={'start'} fontSize={'14px'} textColor={'#A28445'}>
					<Text>
						<Link href={`/${lang}`}>
							<HomeIcon />
						</Link>
					</Text>
					{pathSegments.map((segment, index) => (
						<Box
							as="li"
							textTransform={'capitalize'}
							listStyleType={'none'}
							key={index}
						>
							{segment === 'catalog' && (
								<Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
									{dictionary.hero.btnCatalog}
								</Link>
							)}
							{index < pathSegments.length - 1 &&
								segment !== lang &&
								segment !== 'catalog' && (
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
