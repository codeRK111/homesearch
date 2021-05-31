import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: '1rem !important',
		},
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem !important',
		},
	},
	alignCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		padding: '0.6rem',
		border: 'none',
		background: theme.shadowColor,
		borderRadius: 15,
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		'&:focus': {
			outline: 'none',
		},
	},
	widthLG: {
		width: 300,
		[theme.breakpoints.down('sm')]: {
			width: '100% !important',
		},
	},
	widthMD: {
		width: 200,
		[theme.breakpoints.down('sm')]: {
			width: '100% !important',
		},
	},
	widthSM: {
		width: 100,
		[theme.breakpoints.down('sm')]: {
			width: '100% !important',
		},
	},
	widthFull: {
		width: '100%',
		padding: '1.2rem',
	},
	bgShadow: {
		background: theme.shadowColor,
	},
	rowWrapper: {
		width: '80%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	userFormWrapper: {
		width: 400,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			padding: '1rem',
		},
	},
	postButton: {
		border: 'none',
		padding: '1.5rem 3rem',
		borderRadius: 50,
		fontSize: '0.8rem',
		fontWeight: 'bold',
		color: '#ffffff',
		background: theme.utilColor,
		boxShadow: '2px 2px 2px #249192,-2px -2px 2px #30c4c6',
	},
	leftSpacer: {
		marginLeft: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '0 !important',
		},
	},
	selectChip: {
		marginLeft: '1rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '0.8rem !important',
		},
	}

}));
export default useStyles;
