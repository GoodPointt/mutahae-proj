import React, { useContext, useEffect, useState } from 'react';

const LocalBagContext = React.createContext();

const useLocalBagEffect = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		let currentValue;

		try {
			currentValue = JSON.parse(
				localStorage.getItem(key) || String(defaultValue)
			);
		} catch (error) {
			currentValue = defaultValue;
		}

		return currentValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export function LocalBagProvider({ children }) {
	const localBag = useLocalBagEffect('localBag', []);

	return (
		<LocalBagContext.Provider value={localBag}>
			{children}
		</LocalBagContext.Provider>
	);
}

export const useLocalBag = () => useContext(LocalBagContext);
