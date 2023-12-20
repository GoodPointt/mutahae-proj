import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import TextLink from '../textLink/TextLink';

const ContactsDesc = ({ dictionary, contacts, lang }) => {
  const { phone } = contacts;

  return (
    <SectionWrapper heading={dictionary.contactDesc.title}>
      <Text mb={'32px'}>{dictionary.contactDesc.towns}</Text>
      <Box mb={'32px'}>
        <Box as="span">{dictionary.contactDesc.delivery}</Box>
        <TextLink href={`tel:+${phone}`}>
          {dictionary.contactDesc.linkPhone}
        </TextLink>
        <Box as="span">{dictionary.contactDesc.askQuestions}</Box>
      </Box>
      <Text>
        {dictionary.pageLinksText.catalog.fromBlog}
        <TextLink href={`/${lang}/${dictionary.pageLinksText.catalog.link}`}>
          {dictionary.pageLinksText.catalog.linkName}
        </TextLink>
      </Text>
    </SectionWrapper>
  );
};

export default ContactsDesc;
