'use client';

import React from 'react';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import mapMarker from '../../../public/mapMarker.png';

const GoogleMap = () => {
  const defaultProps = {
    center: {
      lat: 31.521684,
      lng: 34.609859,
    },
    zoom: 12,
  };

  return (
    <Box w="100%" h={{ base: '400px', lg: '100%' }}>
      {/* <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          disableDefaultUI={true}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <AdvancedMarker position={defaultProps.center}>
            <Flex justify="center" flexDir="column" align="center" gap="4px">
              <Text fontSize="md" color="#a28445">
                Motag haetz ltd
              </Text>
              <Image src={mapMarker.src} alt="marker" w={30} h={30} />
            </Flex>
          </AdvancedMarker>
        </Map>
      </APIProvider> */}
      <AspectRatio>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2307.2496485324154!2d34.60951930820427!3d31.521696408366747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDMxJzE3LjgiTiAzNMKwMzYnMzUuNSJF!5e1!3m2!1sen!2sua!4v1701858857244!5m2!1sen!2sua"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </AspectRatio>
    </Box>
  );
};
export default GoogleMap;
