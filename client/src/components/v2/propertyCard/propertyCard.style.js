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
		fontSize: '0.8rem',
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
		width: '100%',
		position: 'relative',
		'&>img': {
			maxWidth: '100%',
			maxHeight: '100%',
			ovjectFit: 'cover',
		},
	},
	feature: {
		position: 'absolute',
		right: 20,
		top: 20,
		zIndex: 1000,
		background: '#2AAAAC',
		padding: '0.5rem 1rem',
		borderRadius: '20px',
		color: '#ffffff',
		fontWeight: 'bold',
	},
}));
export default useStyles;
