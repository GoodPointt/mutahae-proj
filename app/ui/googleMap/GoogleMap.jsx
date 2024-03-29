'use client';

import React from 'react';

import { AspectRatio, Box } from '@chakra-ui/react';

const GoogleMap = () => {
	return (
		<Box w="100%" h="100%" filter="invert(1) grayscale(0.5)">
			<AspectRatio ratio={16 / 11.3}>
				<iframe
					title="MutagHaetz on map"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.0946519545955!2d34.6098535!3d31.5215602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150286a7b4b50667%3A0x26dfad5636bcaa2d!2sAmsterdam%20St%203%2C%20Sderot%2C%20Israel!5e0!3m2!1sen!2sua!4v1701863556645!5m2!1sen!2sua"
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</AspectRatio>
		</Box>
	);
};
export default GoogleMap;
