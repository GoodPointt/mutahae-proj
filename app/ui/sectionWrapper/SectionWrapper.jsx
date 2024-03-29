import { Box, Container, Heading } from '@chakra-ui/react';

const SectionWrapper = ({
	position = '',
	children,
	bg = 'transparent',
	as = 'section',
	heading = '',
	py = { base: '30px', lg: '50px', xl: '70px' },
	pt = { base: '30px', lg: '50px', xl: '70px' },
	pb = { base: '30px', lg: '50px', xl: '70px' },
	headingAs = 'h2',
	w = '',
	zIndex = '',
	style = {},
	href,
}) => {
	return (
		<Box
			style={style}
			position={position}
			as={as}
			bg={bg}
			py={py}
			pt={pt}
			pb={pb}
			bgRepeat={'no-repeat'}
			bgPos={'center'}
			bgSize={'cover'}
			w={w}
			zIndex={zIndex}
		>
			<Container maxW={{ base: '744px', lg: '1000px', xl: '1176px' }} px="12px">
				{heading &&
					(href ? (
						<Heading
							as={headingAs}
							href={href ? href : null}
							display={'inline-block'}
						>
							<Heading
								_hover={headingAs !== 'h2' ? { color: '#81672e' } : null}
								transition={'all 0.3s'}
								mb={{ base: 6, lg: 8 }}
								as="h2"
								fontSize={{ base: '2xl', lg: '4xl' }}
							>
								{heading}
							</Heading>
						</Heading>
					) : (
						<Heading
							as={headingAs}
							mb={{ base: 6, lg: 8 }}
							fontSize={{ base: '2xl', lg: '4xl' }}
						>
							{heading}
						</Heading>
					))}
				{children}
			</Container>
		</Box>
	);
};

export default SectionWrapper;
