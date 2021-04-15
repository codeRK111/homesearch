import imageCompression from 'browser-image-compression';

export async function handleImageUpload(imageFile, maxSize = 0.5) {
	console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
	console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

	const options = {
		maxSizeMB: maxSize,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		console.log(
			'compressedFile instanceof Blob',
			compressedFile instanceof Blob
		); // true
		console.log(
			`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
		); // smaller than maxSizeMB

		return compressedFile;
	} catch (error) {
		console.log(error);
	}
}

export const profileCompletedStatus = (user) => {
	let defaultValue = 0;
	const increaseStatus = 25;
	for (const info in user) {
		if (info === 'number' && user[info]) {
			defaultValue += increaseStatus;
		}
		if (info === 'city' && user[info]) {
			defaultValue += increaseStatus;
		}
		if (info === 'email' && user[info]) {
			defaultValue += increaseStatus;
		}
		if (info === 'name' && user[info]) {
			defaultValue += increaseStatus;
		}
	}

	return defaultValue;
};
