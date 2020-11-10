import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	detailsWrapper: {
		minHeight: '600px',
		padding: '0 5rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0 1rem',
		},
	},
	p1: {
		padding: '1rem',
	},
	p1Details: {
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			padding: '1rem 0',
		},
	},
	pageWrapper: {
		backgroundColor: theme.appBarColor,
	},
	paper: {
		height: '100%',
	},
	title: {
		display: 'inline',
		padding: 0,
		margin: 0,
	},
	borderRight: {
		borderRight: '1px solid #cccccc',
	},
	center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconButton: {
		padding: '10px',
		color: '#ffffff',
		backgroundColor: theme.colorOne,
		border: 'none',
	},
	chatButton: {
		padding: '10px',
		backgroundColor: '#ffffff',
		border: '2px solid #cccccc',
	},
	contactButton: {
		padding: '10px',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		border: 'none',
	},
	whIcon: {
		color: theme.colorTwo,
		marginRight: '5px',
	},
	cWhite: {
		color: '#ffffff',
	},
	feedbackWrapper: {
		backgroundColor: theme.appBarColor,
	},
	feedbackButton: {
		padding: '8px 10px',
		backgroundColor: '#ffffff',
		border: '1px solid #cccccc',
	},
	emoji: {
		fontSize: '1.1rem',
		color: theme.colorTwo,
		marginRight: '0.5rem',
	},
	searchWrapper: {
		width: '500px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	selected: {
		backgroundColor: theme.colorTwo,
	},
	avatarIcon: {
		fontSize: '0.9rem',
		color: '#ffffff',
	},
	avatar: {
		backgroundColor: '#ffffff',
		border: '1px solid #cccccc',
	},
	listItem: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	list: {
		paddingTop: 4,
		paddingBottom: 4,
	},
	cGreen: {
		color: theme.colorOne,
	},
	chatButtonWrapper: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'flex-start',
			marginTop: '1rem',
		},
	},
	header: {
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		overflow: 'auto',
	},
	cell: {
		padding: '0.6rem 0.5rem',
		fontSize: '0.9rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem 0',
		},
	},
	item: {
		'&:nth-child(even)': {
			backgroundColor: theme.appBarColor,
		},
	},
	itemWrapper: {
		overflow: 'auto',
		maxHeight: '500px',
		overflowY: 'auto',
	},
	chip: {
		maxWidth: '150px',
	},
}));
export default useStyles;
