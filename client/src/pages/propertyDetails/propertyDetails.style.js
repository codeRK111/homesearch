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
	},
	selected: {
		backgroundColor: theme.colorTwo,
	},
	avatarIcon: {
		fontSize: '0.9rem',
		color: '#ffffff',
	},
	avatar: {
		width: '3rem',
		height: '3rem',
	},
	listItem: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	list: {
		paddingTop: 4,
		paddingBottom: 4,
	},
}));
export default useStyles;
