import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import Image from 'next/image';

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
        gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
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
              src={attributes?.imgUrl || '/member.png'}
              alt={attributes?.name + ' ' + attributes?.position}
              fill
              style={{ objectFit: 'cover', height: '100%' }}
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
