import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '60vw',
		padding: '1rem',
		color: theme.fontColor,
		[theme.breakpoints.down('sm')]: {
			width: '90vw',
		},
	},
	label: {
		color: theme.fontColor,
		fontSize: '0.8rem',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	avatar: {
		width: '10rem',
		height: 'auto',
	},
	title: {
		fontSize: '1.5rem',
	},
	cGreen: {
		color: theme.colorTwo,
	},
	cBlack: {
		color: '#000000',
	},
	icon: {
		fontSize: '1rem',
	},
	button: {
		textTransform: 'none',
		marginLeft: '2rem',
	},
	buttonUpload: {
		textTransform: 'none',
	},
	input: {
		display: 'none',
	},
	paper: {
		marginRight: theme.spacing(2),
	},

	buttonText: {
		display: 'flex',
		alignItems: 'center',
		color: '#707070',
		minWidth: '200px',
		justifyContent: 'center',
		padding: '0.5rem 0',
		boxSizing: 'border-box',
	},

	searchWrapper: {
		display: 'flex',
		border: '1px solid #cccccc',
		margin: '0.3rem',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	parent: {
		maxHeight: '30vh',
		overflowY: 'auto',
	},
	searchIcon: {
		color: '#c1c1c1',
		marginRight: '0.3rem',
	},
	cRed: {
		color: 'red',
	},
	item: {
		padding: '0.5rem',
		width: '30vw',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.fontColor,
		},
		[theme.breakpoints.down('sm')]: {
			width: '80vw',
		},
	},
	mobileNumberWrapper: {
		width: '50vw',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
}));
export default useStyles;
