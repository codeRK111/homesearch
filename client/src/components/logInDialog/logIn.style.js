import { makeStyles } from '@material-ui/core/styles';

const img = require('../../assets/living.jpg');
const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '60vw',
		height: '60vh',
		boxSizing: 'border-box',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
	bg: {
		height: '100%',
		backgroundImage: `url("${img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	fullHeight: {
		height: '100%',
	},
	contentWrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		marginTop: '1rem',
		width: '80%',
	},
	otp: {
		padding: '0.9rem',
		margin: '0.9rem',
		fontSize: '1.2rem',
		border: '3px solid #c1c1c1',
		borderRadius: '5px',
		[theme.breakpoints.down('md')]: {
			padding: '0.7rem',
			margin: '0.7rem',
			fontSize: '1rem',
			border: '2px solid #c1c1c1',
			borderRadius: '4px',
		},
	},

	fullWidth: {
		[theme.breakpoints.down('xs')]: {
			width: '100vw',
		},
	},
}));
export default useStyles;
