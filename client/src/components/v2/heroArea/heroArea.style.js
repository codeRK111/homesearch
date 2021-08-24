import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	topMargin: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '3rem',
		},
	},
	wrapper: {
		width: '100%',
		display: 'flex',
		marginTop: '25vh',
		paddingLeft: theme.leftPadding,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			marginTop: 100,
			paddingLeft: 0,
			paddingRight: '2rem',
		},
	},
	iconsContainer: {
		width: '100%',

		marginTop: '5vh',
		// paddingLeft: theme.leftPadding,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			marginTop: 40,
		},
	},
	searchWrapper: {
		width: '70rem',
		padding: '0.7rem 1rem 0.7rem 1rem',
		background: theme.shadowColor,
		borderRadius: '25px',
		display: 'flex',
		justifyContent: 'space-between',
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		'&>input': {
			border: 'none',
			width: '100%',
			background: 'transparent',

			'&:focus': {
				outline: 'none',
			},
			'&::placeholder': {
				color: theme.primaryHeadingColor,
				fontWeight: 700,
				[theme.breakpoints.down('sm')]: {
					fontSize: '0.6rem',
				},
			},
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			padding: '1rem',
		},
	},
	svgWrapper: {
		height: '30px',
		width: '30px',
		[theme.breakpoints.down('sm')]: {
			height: '20px',
			width: '20px',
		},
	},
	whatsappIcon: {
		height: '50px',
		width: '50px',
	},
	iconsWrapper: {
		width: '70rem',
		display: 'flex',
		justifyContent: 'flex-end',
		marginLeft: theme.leftPadding,
		'&>div': {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginLeft: '4rem',
			'&>p': {
				fontSize: '0.8rem',
				fontWeight: 'bold',
			},
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			justifyContent: 'space-evenly',
			marginLeft: 0,
			'&>div': {
				marginLeft: 0,
			},
		},
	},
	iconShadow: {
		background: theme.shadowColor,
		borderRadius: '50%',
		padding: '1rem',
		boxShadow: '10px 5px 10px #a4a4a4,-10px -10px 20px #ffffff',
		display: 'inline-block',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
		},
	},
	whatsappShadow: {
		background: theme.shadowColor,
		borderRadius: '50%',
		boxShadow: '5px 5px 9px #bebebe,-5px -5px 9px #ffffff',
		display: 'inline-block',
	},
	whatsAppWrapper: {
		marginTop: '12vh',
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '4rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '6vh',
			justifyContent: 'center',
			paddingRight: 0,
		},
	},
	tabWrapper: {
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
	},
	tabText: {
		color: theme.primaryHeadingColor,
		fontWeight: 'bold',
		fontSize: '1rem',
		cursor: 'pointer',
	},
	mr: {
		marginRight: '2rem',
	},
	selected: {
		backgroundColor: theme.utilColor,
		padding: '0.5rem 1rem',
		color: '#ffffff',
		borderRadius: 20,
	},
	menuWrapper: {
		width: '70rem',
		maxHeight: 200,
		overflow: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '70vw',
		},
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
	cityWrapper: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		padding: '0.5rem',
		background: '#e3e3e3',
		boxShadow: '6px 6px 12px #bfbfbf,-6px -6px 12px #ffffff',
		borderRadius: 10,
	},
	locationIcon: {
		color: theme.secondaryHeadingColor,
	},
	clearIcon: {
		cursor: 'pointer',
	},
	searchButton: {
		background: theme.shadowColor,
		padding: '0.7rem',
		boxShadow: '10px 5px 10px #a4a4a4,-10px -10px 20px #ffffff',
		display: 'inline-block',
		cursor: 'pointer',
		borderRadius: 25,
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
		},
		'&>img': {
			height: '1rem',
			[theme.breakpoints.down('sm')]: {
				height: '1rem',
			},
		},
	},
}));
export default useStyles;
