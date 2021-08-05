import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: '1rem !important',
		},
	},
	shadow: {
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'center',
		minWidth: '75px',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
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
		boxSizing: 'border-box',
	},
	widthLG: {
		width: 300,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			width: '100% !important',
		},
	},
	widthMD: {
		width: 200,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			width: '100% !important',
		},
	},
	widthSM: {
		width: 100,
		boxSizing: 'border-box',
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
	},
	rowWrapper2: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	width80: {
		width: '80%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	width70: {
		width: '70%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	width60: {
		width: '60%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	columnWrapper: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		marginRight: '2rem',

		'& > span': {
			fontWeight: '600',
			marginRight: '1rem',
			[theme.breakpoints.down('sm')]: {
				fontSize: '0.8rem',
				marginBottom: '0.5rem',
			},
		},
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			marginTop: '1rem',
			marginRight: 0,
		},
	},
	columnWrapper2: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		boxSizing: 'border-box',
		marginRight: '2rem',

		'& > span': {
			fontWeight: '600',
			[theme.breakpoints.down('sm')]: {
				fontSize: '0.8rem',
			},
		},
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	width100: {
		width: '100%',
	},
	select: {
		border: 'none',
		padding: '1rem 2rem',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		background: theme.shadowColor,
		fontSize: '1.2rem',
	},
	image: {
		width: '100%',
		height: '200px',
	},
	uploadButton: {
		display: 'none',
	},
	label: {
		padding: '0.5rem 0',
		width: '100%',
		borderRadius: '5px',
		cursor: 'pointer',
		display: 'block',
		boxSizing: 'border-box',
		textAlign: 'center',
	},
	remove: {
		padding: '0.5rem 0',
		border: '1px solid #cccccc',
		width: '100%',
		borderRadius: '5px',
		backgroundColor: 'red',
		cursor: 'pointer',
		display: 'block',
		boxSizing: 'border-box',
		textAlign: 'center',
		color: '#ffffff',
	},
	uploadMore: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		boxSizing: 'border-box',
		alignItems: 'center',
		border: `2px dotted ${theme.utilColor}`,
		cursor: 'pointer',
		minHeight: 200,
	},
	imageWrapper: {
		borderRadius: 10,
		overflow: 'hidden',
		border: `4px solid ${theme.utilColor}`,
		padding: '0.2rem',
		boxSizing: 'border-box',
		position: 'relative',
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
		zIndex: 2,
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0.5rem',
		boxSizing: 'border-box',
	},
	pointer: {
		cursor: 'pointer',
	},
}));
export default useStyles;
