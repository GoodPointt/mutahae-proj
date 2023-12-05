'use client';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import ModalWindow from '../modalWindow/ModalWindow';
import FormContact from '../modalContact/ModalContact';

const About = ({ dictionary, contacts }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <SectionWrapper bg="url('/about-background.jpg')">
        <Heading as={'h2'} textTransform={'uppercase'} mb={'44px'}>
          <Text as={'span'} color="#a28445">
            {dictionary.aboutUs.title.firstWord}&nbsp;
          </Text>
          {dictionary.aboutUs.title.secondWord}
        </Heading>
        <Box
          position={'relative'}
          py={'16px'}
          px={'24px'}
          _rtl={{
            _after: {
              right: 0,
            },
          }}
          _after={{
            display: ['block', 'block'],
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            h: '100%',
            w: '1px',
            bgColor: '#a28445',
          }}
          fontSize={{ base: '14px', sm: '16px' }}
          w={{ base: '100%', lg: '75%', xl: '55%' }}
          ml={{ base: '0px', sm: '24px' }}
        >
          <List display={'flex'} flexDirection={'column'} gap={'24px'}>
            {dictionary?.aboutUs.main.map(el => (
              <ListItem key={el.text}>
                <Text>{el.text}</Text>
              </ListItem>
            ))}
          </List>
          <Button
            bgColor={'#a28445'}
            color={'#fff'}
            _hover={{ bgColor: '#81672e' }}
            mt={'24px'}
            onClick={onOpen}
          >
            {dictionary.buttons.contact}
          </Button>
        </Box>
      </SectionWrapper>
      <ModalWindow onClose={onClose} isOpen={isOpen}>
        <FormContact dictionary={dictionary} contacts={contacts} />
      </ModalWindow>
    </>
  );
};

export default About;
