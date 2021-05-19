import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		marginTop: '2rem',
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
		minHeight: '17rem',
		height: 400,
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
	},
	dateWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.secondaryHeadingColor,
		padding: '0.5rem 1rem',
		color: '#ffffff',
		maxHeight: '50px',
		borderRadius: 10,
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
	},
	keyValue: {
		minHeight: '60px',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		background: '#cdcaca',

		'& span': {
			fontSize: '1.8rem',
			fontWeight: 'bolder',
		},
	},
	overviewIcon: {
		height: '0.9rem',
	},
	cardMedia: {
		height: 100,
		borderRadius: 20,
	},
}));
export default useStyles;
