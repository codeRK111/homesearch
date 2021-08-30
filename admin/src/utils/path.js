import noUser from '../assets/noUser.png';

export const renderProfileImage = (image) => {
	if (image) {
		return `/profile/${image}`;
	} else {
		return noUser;
	}
};

export const renderBuilderImage = (image) => {
	if (image) {
		return `/assets/builders/${image}`;
	} else {
		return null;
	}
};
