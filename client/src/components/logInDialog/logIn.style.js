import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '30vw',
		// minHeight: '60vh',
		// height: '100%',
		boxSizing: 'border-box',
		background: '#e0e0e0',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
		borderRadius: 20,
	},
	radius: {
		borderRadius: 20,
	},
	bg: {
		height: '100%',
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
		padding: '1rem',
		boxSizing: 'border-box',
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
	button: {
		cursor: 'pointer',
		background: theme.shadowColor,
		display: 'flex',
		minWidth: '75px',
		justifyContent: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '1rem 3rem',
		border: 'none',
	},
}));
export default useStyles;
