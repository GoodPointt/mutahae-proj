'use client';

import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
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
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
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
      </APIProvider>
    </Box>
  );
};
export default GoogleMap;
