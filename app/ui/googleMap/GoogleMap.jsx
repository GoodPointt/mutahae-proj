'use client';

import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { Box } from '@chakra-ui/react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const AnyReactComponent = ({ text }) => (
  <Box>
    <HiLocationMarker color="crimson" size={30} />
  </Box>
);

const GoogleMap = () => {
  const defaultProps = {
    center: {
      lat: 50.46649991907429,
      lng: 30.485238674923373,
    },
    zoom: 11,
  };

  return (
    <Box w={300} h={300}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          //gestureHandling={"cooperative"}
          disableDefaultUI={true}
        >
          <Marker position={defaultProps.center} />
        </Map>
      </APIProvider>
    </Box>
  );
};
export default GoogleMap;
///AIzaSyCWeILQzFj9MtlzhD_dtUcvV844h3g0z7E
