import React from 'react';
import Image from 'next/image';

const EngFlag = () => {
	return (
		<Image
			src={'/img/gb.svg'}
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

export default EngFlag;
