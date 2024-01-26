import React from 'react';
import Image from 'next/image';

const HeFlag = () => {
	return (
		<Image
			src={'/img/he.svg'}
			alt="logo"
			width="35"
			height="25"
			style={{
				objectFit: 'cover',
				width: 35,
				height: 25,
				display: 'block',
			}}
		/>
	);
};

export default HeFlag;
