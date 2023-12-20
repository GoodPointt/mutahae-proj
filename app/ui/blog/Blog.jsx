import React from 'react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import BlogsSlider from '../BlogsSlider/BlogsSlider';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';

const Blog = async ({ lang, dictionary, posts }) => {
  return (
    <SectionWrapper heading={dictionary.header.navItems[3].title}>
      <BlogsSlider posts={posts} lang={lang} />
      <Text mt={'32px'}>
        {dictionary.pageLinksText.catalog.fromBlog}
        <Link
          href={`/${lang}/${dictionary.pageLinksText.catalog.link}`}
          style={{
            marginLeft: '5px',
            marginRight: '5px',
            color: '#a28445',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          {dictionary.pageLinksText.catalog.linkName}
        </Link>
      </Text>
    </SectionWrapper>
  );
};

export default Blog;
