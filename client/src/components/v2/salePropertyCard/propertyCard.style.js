import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	flexParentWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	flexWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	contentText: {
		fontWeight: '700',
		fontSize: '0.7rem',
		marginLeft: '0.4rem',
		// textShadow: '0px 0.05px, 0.05px 0px, 0.05px 0.05px',
	},
	wrapper: {
		height: '100%',
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #aaaaaa,-12px -12px 24px #ffffff',
		boxSizing: 'border-box',
	},
	img: {
		height: '15px',
		width: '15px',
	},
	title: {
		fontWeight: 'boldest',
		padding: '0.5rem',
		margin: 0,
		fontSize: '1.5rem',
		// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		},
	},

	feature: {
		position: 'absolute',
		right: 15,
		top: 15,
		zIndex: 1000,
		background: '#2AAAAC',
		padding: '0.5rem 1rem',
		borderRadius: 15,
		color: '#ffffff',
		fontSize: '0.7rem',
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
		height: '15rem',
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
		// backgroundColor: 'rgba(0,0,0,0.4)',
		zIndex: 2,
		display: 'flex',
		justifyContent: 'flex-end',
		borderRadius: 40,
		padding: '0 1rem 0 0',
		boxSizing: 'border-box',
	},
	link: {
		color: '#000000',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	rent: {
		fontWeight: 'boldest',
		padding: '0.5rem',
		margin: 0,
		fontSize: '1rem',
		// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		},
	},
	contentWrapper: {
		padding: '1rem 1rem 0 1rem',
	},
}));
export default useStyles;
