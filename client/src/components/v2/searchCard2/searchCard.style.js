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
		position: 'absolute',
		backgroundImage: `url("${props.img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			'#758283' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,

		backgroundSize: 'contain',
		backgroundPosition: 'center',
		// minHeight: '30rem',
		height: '90%',
		width: '100%',
		borderRadius: 30,
	}),
	imageWrapperCard: (props) => ({
		position: 'absolute',
		backgroundImage: `url("${props.img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		// minHeight: '30rem',
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
		backgroundColor: 'rgba(0,0,0,0.2)',
		zIndex: 2,
		display: 'flex',
		justifyContent: 'flex-end',
		borderRadius: 30,
		padding: '0 4rem 0 0',
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
		[theme.breakpoints.down('sm')]: {
			padding: '0 1.5rem 0 0',
		},
	},
	dateWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.utilColor,
		padding: '1rem',
		color: '#ffffff',
		height: '80px',

		'& >span': {
			fontWeight: 'bolder',
			fontSize: '2rem',
		},
	},
	dateWrapperCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.utilColor,
		padding: '0.7rem',
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

	rotate: {
		// transform: 'rotate(-30deg)',
	},
	titleWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
	smallText2: {
		fontSize: '0.85rem',
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
	bolder: {
		fontWeight: 'bolder',
	},
	colorGray: {
		color: '#929292',
	},
	mr1: {
		marginRight: '1rem',
	},
	icon: {
		height: '1.2rem',
	},
	locationText: {
		margin: '0 0 0 0.5rem',
		padding: '0.3rem',
		textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
		fontWeight: 'bolder',
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
	keyValueProject: {
		position: 'relative',
		height: '90px',
		[theme.breakpoints.down('sm')]: {
			height: '90px',
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
	swipableWrapper: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		zIndex: 100,
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
	imageContainer: {
		position: 'relative',
		width: '100%',
		height: '32rem',
	},
	imageContainerCard: {
		position: 'relative',
		width: '100%',
		minHeight: '20rem',
		height: '100%',
		[theme.breakpoints.down('sm')]: {
			minHeight: '15rem',
		},
	},
	cardContentWrapper: {
		padding: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
		},
	},
	logo: {
		height: 50,
		[theme.breakpoints.down('sm')]: {
			height: 40,
		},
	},
	propertyName: {
		fontSize: '2rem',
		textShadow: '0px 0.2px, 0.2px 0px, 0.2px 0.2px',
		letterSpacing: 1,
		fontWeight: 'bolder',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.4rem',
		},
	},
	propertyNameSearch: {
		fontSize: '1.6rem',
		textShadow: '0px 0.2px, 0.2px 0px, 0.2px 0.2px',
		letterSpacing: 1,
		fontWeight: 'bolder',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.4rem',
		},
	},
	developerName: {
		color: '#000000',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
			color: theme.utilColor,
		},
	},
}));
export default useStyles;
