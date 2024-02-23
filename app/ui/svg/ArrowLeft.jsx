import React from 'react';

const ArrowLeft = ({ width = '6px', height = '12px' }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.21289 11.25L5.96289 10.5L1.53789 6.11247L5.96289 1.72498L5.21289 0.974976L0.0378906 6.11247L5.21289 11.25Z"
				fillOpacity="0.667"
			/>
		</svg>
	);
};

export default ArrowLeft;
