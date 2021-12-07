import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		marginTop: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: 0,
		},
	},
	imageWrapper: {
		width: '100%',
		maxHeight: 300,
		border: '8px solid #ffffff',
		borderRadius: 40,
		overflow: 'hidden',
		position: 'relative',
		'& img': {
			width: '100%',
			height: '100%',
			objctFit: 'contain',
			// height: 'auto',
			// maxHeight: '100%',
		},
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.2)',
		zIndex: 2,
		display: 'flex',
		justifyContent: 'flex-end',
		borderRadius: 40,
		boxSizing: 'border-box',
		paddingRight: '2rem',
	},
	dateWrapperCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.utilColor,
		padding: '0.7rem 1rem',
		color: '#ffffff',
		height: '70px',

		'& >span': {
			fontWeight: 'bolder',
			fontSize: '1.7rem',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
			height: '50px',
			'& >span': {
				fontWeight: 'bold',
				fontSize: '1.2rem',
			},
		},
	},
	locationText: {
		margin: '0 0 0 0.5rem',
		padding: '0.3rem',
		letterSpacing: 1,
		fontWeight: 'bolder',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
}));
export default useStyles;
