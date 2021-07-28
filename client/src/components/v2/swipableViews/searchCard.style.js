import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		marginTop: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: 0,
		},
	},
	imageWrapper: (props) => ({
		position: 'relative',
		backgroundImage: `url("${props.img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		minHeight: '20rem',
		height: '100%',
		width: '100%',
		borderRadius: 30,
	}),

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
		justifyContent: 'flex-end',
		borderRadius: 30,
		padding: '0 1rem 0 0',
		boxSizing: 'border-box',

		'&>button': {
			padding: '1rem 2rem',
			background: '#FFD609',
			color: '#000000',
			fontWeight: 'bold',
		},

		'&:hover': {
			'&>button': {
				display: 'inline-block',
			},
		},
	},
	dateWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.utilColor,
		padding: '0.5rem 1rem',
		color: '#ffffff',
		maxHeight: '50px',
		borderRadius: 10,

		'& >span': {
			fontWeight: 'bolder',
			fontSize: '1.4rem',
		},
	},

	rotate: {
		// transform: 'rotate(-30deg)',
	},
	titleWrapper: {
		display: 'flex',
		alignItems: 'center',
		'& div': {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			'& h2': {
				margin: 0,
				padding: '0.3rem',
			},
		},
		// [theme.breakpoints.down('sm')]: {
		// 	flexDirection: 'column',
		// },
	},
	smallText: {
		fontSize: '0.7rem',
	},
	colorPrimary: {
		color: theme.primaryHeadingColor,
	},
	colorSecondary: {
		color: theme.secondaryHeadingColor,
	},
	bold: {
		fontWeight: 'bold',
	},
	colorGray: {
		color: '#929292',
	},
	mr1: {
		marginRight: '2rem',
	},
	icon: {
		height: '1.2rem',
	},
	locationText: {
		margin: '0 0 0 0.5rem',
		padding: '0.3rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
	keyValue: {
		position: 'relative',
		height: '80px',
		[theme.breakpoints.down('sm')]: {
			height: '80px',
		},
	},
	iconImage: {
		[theme.breakpoints.down('sm')]: {
			height: '1rem',
		},
	},
	link: {
		color: '#000000',
		textDecoration: 'none',
		wordBreak: 'break-word',
		'&:hover': {
			textDecoration: 'underline',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		},
	},

	test: {
		'& h1,h5': {
			wordBreak: 'break-all',
		},
	},
	header: {
		backgroundColor: theme.utilColor,
		color: '#ffffff',
	},
	cell: {
		padding: '0.6rem 0.5rem',
		fontSize: '0.9rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem 0',
		},
	},
}));
export default useStyles;
