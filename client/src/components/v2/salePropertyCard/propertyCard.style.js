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
		fontWeight: '500',
		fontSize: '0.7rem',
		marginLeft: '0.4rem',
	},
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '5px 5px 12px #b3b3b3,-5px -5px 12px #ffffff',
	},
	img: {
		height: '15px',
		width: '15px',
	},
	title: {
		fontWeight: 'boldest',
		padding: '0.5rem',
		margin: 0,
		fontSize: '1.2vw',
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
		height: '10rem',
		width: '100%',
		borderRadius: 20,
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
		borderRadius: 20,
		padding: '0 1rem 0 0',
		boxSizing: 'border-box',
	},
}));
export default useStyles;
