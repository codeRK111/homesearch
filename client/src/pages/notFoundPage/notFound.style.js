import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
	title: {
		fontSize: '4rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
		},
	},
	bgImage: {
		height: '40vh',
		backgroundImage:
			'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
		backgroundPosition: 'center',
		// backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.down('sm')]: {
			backgroundSize: 'cover',
		},
	},
	subtitle: {
		fontSize: '2rem',
		margin: 0,
		padding: 0,
	},
}));

export default useStyle;
