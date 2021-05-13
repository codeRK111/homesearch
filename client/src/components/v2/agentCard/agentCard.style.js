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
		fontWeight: 'bold',
		fontSize: '0.6rem',
		marginLeft: '0.4rem',
	},
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '23px 23px 46px #a4a4a4,-23px -23px 46px #ffffff',
	},
	img: {
		height: '15px',
		width: '15px',
	},
	title: {
		fontWeight: 'boldest',
		padding: '0.5rem',
		margin: 0,
	},
	imageWrapper: {
		position: 'relative',
		backgroundImage: `url("https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100")`,
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
		justifyContent: 'flex-end',
		borderRadius: 20,
		padding: '0 1rem 0 0',
		boxSizing: 'border-box',
	},
	feature: {
		position: 'absolute',
		right: 10,
		top: 10,
		zIndex: 1000,
		background: '#2AAAAC',
		padding: '0.5rem 1rem',
		borderRadius: '20px',
		color: '#ffffff',
		fontSize: '0.7rem',
	},
}));
export default useStyles;
