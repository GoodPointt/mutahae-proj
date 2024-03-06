import Image from 'next/image';

import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';

import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Team = ({ dictionary, members }) => {
	return (
		<SectionWrapper bg="#191617">
			<Heading
				as={'h2'}
				textTransform={'uppercase'}
				color={'#a28445'}
				mb={'44px'}
			>
				{dictionary.title}
			</Heading>
			<Grid
				gridTemplateColumns={{
					base: '1fr',
					md: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
				}}
				gap={'24px'}
				as={'ul'}
			>
				{members.map(({ attributes }) => (
					<GridItem
						as={'li'}
						key={attributes.uid}
						borderBottom={'2px #a28445 solid'}
						position={'relative'}
						h={'520px'}
						_before={{
							display: 'block',
							content: "''",
							w: '2px',
							bgColor: '#a28445',
							h: '50%',
							position: 'absolute',
							bottom: 0,
							left: 0,
							zIndex: 2,
							transition: 'all 300ms ease',
						}}
						_hover={{
							_before: {
								h: '100%',
							},
						}}
					>
						<Image
							src={attributes?.imgUrl || '/img/member.png'}
							alt={attributes?.name + ' ' + attributes?.position}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{
								objectFit: 'cover',
							}}
						/>
						<Box
							display={'flex'}
							alignItems={'flex-end'}
							justifyContent={'space-between'}
							position={'relative'}
							zIndex={2}
							w={'100%'}
							h={'100%'}
							p={'16px'}
							textTransform={'uppercase'}
							bg="linear-gradient(0deg,rgba(0, 0, 0, 0.7) 15%, rgba(252, 176, 69, 0) 50%)"
						>
							<Text fontWeight={'600'}>{attributes?.name}</Text>
							<Text color={'#a28445'}>{attributes?.position}</Text>
						</Box>
					</GridItem>
				))}
			</Grid>
		</SectionWrapper>
	);
};

export default Team;
