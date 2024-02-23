import React from 'react';

const ArrowDown = ({ width = '20px', height = '20px' }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 7.5L9 12.5L14 7.5"
				// stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ArrowDown;
