import noUser from '../assets/noUser.png';

export const renderProfileImage = (image) => {
	if (image) {
		return `/profile/${image}`;
	} else {
		return noUser;
	}
};
