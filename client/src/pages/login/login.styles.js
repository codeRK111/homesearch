import { makeStyles } from '@material-ui/core/styles';

const img = require('../../assets/real.jpg');

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		position: 'relative',
		backgroundImage: `url("${img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#f1c40f',
		width: '3rem',
		height: '3rem',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.8)',
		zIndex: 2,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	textWrapper: {
		color: '#ecf0f1',
		fontFamily: "'Abel', sans-serif",
		fontSize: '1.5rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		color: '#16a085',
	},
	signInText: {
		fontFamily: "'Abel', sans-serif",
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: '1.3rem',
	},
}));

export default useStyles;
