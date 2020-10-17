import { makeStyles } from '@material-ui/core/styles';
const img = require('../../assets/real.jpg');

export const useStyles = makeStyles((theme) => ({
	title: {
		color: '#ffffff',
		textAlign: 'center',
		marginTop: '5%',
		[theme.breakpoints.down('sm')]: {
			padding: '1rem',
		},
	},
	searchBoxWrapper: {
		backgroundColor: '#ffffff',
		display: 'flex',
		alignItems: 'center',
		borderRight: '1px solid #cccccc',
		paddingLeft: '10px',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
	},
	searchField: {
		border: 'none',

		paddingLeft: '10px',
	},
	wrapper: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	buttonWrapper: {
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
	},
	bg: {
		position: 'relative',
		backgroundImage: `url("${img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '70vh',
		[theme.breakpoints.down('sm')]: {
			height: '60vh',
		},
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	},
	formControl: {
		backgroundColor: '#ffffff',
	},
	budget: {
		backgroundColor: '#ffffff',
		height: '100%',
		cursor: 'pointer',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
		minWidth: '150px',
		maxWidth: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	property: {
		backgroundColor: '#ffffff',
		height: '100%',
		cursor: 'pointer',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
		minWidth: '150px',
		borderLeft: '1px solid #cccccc',
		maxWidth: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: '18px',
		marginLeft: '0.5rem',
		color: theme.colorOne,
	},
	budgetPopper: {
		backgroundColor: '#ffffff',
		maxWidth: '200px',
	},
}));
