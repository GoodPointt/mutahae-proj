import React from 'react';

const BlogPageNavIcon = ({ w, h }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={w || '24'}
			height={h || '24'}
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M19.0451 9.3239L20.3528 17.8239C20.5288 18.9681 19.6435 20 18.4859 20H5.88929C4.73162 20 3.84634 18.9681 4.02237 17.8239L5.33006 9.3239C5.47183 8.40243 6.26469 7.72222 7.19699 7.72222H17.1782C18.1105 7.72222 18.9033 8.40243 19.0451 9.3239Z"
				// stroke="#A28445"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.0786 4.88889C14.0786 3.84568 13.2329 3 12.1897 3C11.1464 3 10.3008 3.84568 10.3008 4.88889"
				// stroke="#A28445"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default BlogPageNavIcon;
