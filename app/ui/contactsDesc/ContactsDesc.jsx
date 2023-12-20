import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import Link from 'next/link';

const ContactsDesc = ({ dictionary, contacts, lang }) => {
  const { phone } = contacts;
  const linkStyle = {
    marginLeft: '5px',
    marginRight: '5px',
    color: '#a28445',
    fontSize: '20px',
    fontWeight: '600',
  };

  return (
    <SectionWrapper heading={dictionary.contactDesc.title}>
      <Text mb={'32px'}>{dictionary.contactDesc.towns}</Text>
      <Box mb={'32px'}>
        <Box as="span">{dictionary.contactDesc.delivery}</Box>
        <Link href={`tel:+${phone}`} style={linkStyle}>
          {dictionary.contactDesc.linkPhone}
        </Link>
        <Box as="span">{dictionary.contactDesc.askQuestions}</Box>
      </Box>
      <Text>
        {dictionary.pageLinksText.catalog.fromBlog}
        <Link
          href={`/${lang}/${dictionary.pageLinksText.catalog.link}`}
          style={linkStyle}
        >
          {dictionary.pageLinksText.catalog.linkName}
        </Link>
      </Text>
    </SectionWrapper>
  );
};

export default ContactsDesc;
