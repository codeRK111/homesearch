import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	justifyCenter: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	},
	justifyStart: {
		display: 'flex',
		justifyContent: 'flex-start',
		width: '100%',
	},
	justifySpaceBetween: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
	},
	justifySpaceAround: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '100%',
	},
	alignCenter: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	flexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	successMessage: {
		color: 'green',
		fontSize: '1.2rem',
		fontWeight: 500,
		textAlign: 'center',
	},
	errorMessage: {
		color: 'red',
		fontSize: '1.2rem',
		fontWeight: 500,
		textAlign: 'center',
	},
	lightBackground: {
		backgroundColor: '#ecf0f1',
	},
	textCenter: {
		textAlign: 'center',
	},
	colorPrimary: {
		color: theme.primaryHeadingColor,
	},
	colorLink: {
		color: theme.linkColor,
	},
	colorSecondary: {
		color: theme.secondaryHeadingColor,
	},
	colorWarning: {
		color: 'red',
	},
	colorUtil: {
		color: theme.utilColor,
	},
	colorGray: {
		color: '#c1c1c1',
	},
	noSpace: {
		margin: 0,
		padding: 0,
	},
	bold: {
		fontWeight: 'bold',
	},
	smText: {
		fontSize: '0.8rem',
	},
	xsText: {
		fontSize: '0.7rem',
	},
	smHide: {
		[theme.breakpoints.down('sm')]: {
			display: 'none !important',
		},
	},
	smFlexColumn: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex !important',
			flexDirection: 'column !important',
		},
	},
	smJustifyBetween: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'space-between !important',
		},
	},
	smFullWidth: {
		[theme.breakpoints.down('sm')]: {
			width: '100% !important',
		},
	},
	smWrap: {
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap !important',
		},
	},
	smAlignCenter: {
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center !important',
		},
	},
	smTopMargin: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem !important',
		},
	},
	smXsText: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
	smFlexWrap: {
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap !important',
		},
	},
	pointer: {
		cursor: 'pointer',
	},
	noTransfrom: {
		textTransform: 'none',
	},
}));
