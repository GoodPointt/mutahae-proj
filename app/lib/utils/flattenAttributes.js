export function flattenAttributes(data) {
	if (!data) return null;

	if (Array.isArray(data)) {
		return data.map(flattenAttributes);
	}

	let flattened = {};

	if (data.attributes) {
		for (let key in data.attributes) {
			if (
				typeof data.attributes[key] === 'object' &&
				data.attributes[key] !== null &&
				'data' in data.attributes[key]
			) {
				flattened[key] = flattenAttributes(data.attributes[key].data);
			} else {
				flattened[key] = data.attributes[key];
			}
		}
	}

	for (let key in data) {
		if (key !== 'attributes' && key !== 'data') {
			flattened[key] = data[key];
		}
	}

	if (data.data) {
		flattened = { ...flattened, ...flattenAttributes(data.data) };
	}

	return flattened;
}
