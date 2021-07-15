import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
		borderRadius: '40px',
		backgroundColor: theme.shadowColor,
		boxShadow: '30px 10px 30px 0 #a6a6a6, -30px -30px 30px 0 #ffffff',
		display: 'flex',
		justifyContent: 'space-between',
	},
	logoWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	logoTitle: {
		color: theme.primaryHeadingColor,
		fontWeight: 700,
		marginLeft: '0.5rem',
		'&>span': {
			color: theme.secondaryHeadingColor,
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		},
	},
	smMenu: {
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'inline-block',
		},
	},
	logo: {
		height: '25px',
	},
	listButton: {
		color: theme.secondaryHeadingColor,
		fontWeight: 700,
		padding: '0.5rem 1rem',
		backgroundColor: theme.shadowColor,
		boxShadow: '5px 5px 9px #a8a8a8, -5px -5px 9px #ffffff',
		borderRadius: '20px',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.secondaryHeadingColor,
			color: '#ffffff',
		},
	},
	profileWrapper: {
		backgroundColor: theme.shadowColor,
		display: 'flex',
		boxShadow: '5px 5px 9px #a8a8a8, -5px -5px 9px #ffffff',
		borderRadius: '10px',
		marginLeft: '1rem',
		padding: '0.2rem',
		'&>img': {
			height: '30px',
		},
	},
	rightSide: {
		display: 'flex',
		alignItems: 'center',
	},
	menuIcon: {
		width: 35,
		[theme.breakpoints.down('sm')]: {
			height: '15px',
		},
	},
}));
export default useStyles;
