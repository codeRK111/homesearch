import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
		borderRadius: '40px',
		backgroundColor: theme.shadowColor,
		boxShadow: '6px 6px 12px #bebebe,-6px -6px 12px #ffffff',
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
		maxHeight: '25px',
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
		borderRadius: '50%',
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
	min: {
		background: theme.shadowColor,
		transition: 'display .3s ease-in-out,min-height .3s ease-in-out',
		minHeight: 5,
		display: 'none',
	},

	max: {
		display: 'block',
		transition: 'display .3s ease-in-out,min-height .3s ease-in-out,',
		minHeight: 200,
		padding: '1rem 3rem',
	},
	iconButton: {
		marginLeft: '1rem',
		borderRadius: 50,
		boxShadow: '5px 5px 9px #a1a1a1,-5px -5px 9px #ffffff',
	},
}));
export default useStyles;
