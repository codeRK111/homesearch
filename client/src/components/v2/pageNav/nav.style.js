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
		alignItems: 'center',
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
			fontSize: '0.8rem',
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
	searchWrapper: {
		borderRadius: 40,
		background: theme.shadowColor,
		minHeight: 50,
		width: 500,
		boxShadow: 'inset 7px 7px 14px #bababa,inset -7px -7px 14px #ffffff',
		display: 'flex',
		alignItems: 'center',
	},
	selectedLocation: {
		padding: '0.5rem 1rem',
		display: 'flex',
		alignItems: 'center',
		background: '#FFD609',
		borderRadius: 20,

		'& span': {
			fontWeight: 'bold',
			fontSize: '0.8rem',
		},
	},
	searchLogo: {
		height: 25,
	},
	menuIcon: {
		width: 30,
		[theme.breakpoints.down('sm')]: {
			width: 25,
		},
	},
	searchButton: {
		padding: '1rem',
	},
}));
export default useStyles;
