export const validateLength = (value: any, length: number) => {
	const str = String(value);
	if (str.length > length) {
		return false;
	} else {
		return true;
	}
};

export const validateNumber = (v: any): boolean => {
	const value = String(v);
	if (value.match(/^[0-9]+$/)) {
		return true;
	} else {
		if (value === '0') {
			return true;
		} else {
			return false;
		}
	}
};
