import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '23px 23px 46px #a4a4a4,-23px -23px 46px #ffffff',
		height: '100%',
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
		height: '20rem',
		width: '100%',
		borderRadius: 40,
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
		borderRadius: 40,
		padding: '0 2rem 0 0',
		boxSizing: 'border-box',
	},
	dateWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: '#2AAAAC',
		padding: '0.5rem 1rem',
		color: '#ffffff',
		maxHeight: '50px',
		borderRadius: 10,
	},
	contentWrapper: {
		padding: '1rem 1rem 3rem 3rem',
	},
	basicWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	basic: {
		display: 'flex',
		alignItems: 'center',

		'& span': {
			fontSize: '0.7rem',
			marginLeft: '0.3rem',
			fontWeight: 'bolder',
		},
		'& img': {
			height: '12px',
		},
	},
	title: {
		margin: 0,
		padding: 0,
		// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
	},
	description: {
		fontSize: '0.7rem',
		lineHeight: 1.5,
		// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
		fontWeight: 'bold',
	},
	rotate: {
		transform: 'rotate(-30deg)',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
		'&:hover': {
			textDecoration: 'underline',
			color: theme.utilColor,
		},
	},
}));
export default useStyles;
