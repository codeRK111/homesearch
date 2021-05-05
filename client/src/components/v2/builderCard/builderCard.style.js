import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '23px 23px 46px #a4a4a4,-23px -23px 46px #ffffff',
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
		borderRadius: 20,
	}),
	featureWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '2rem',
		'&  div': {
			background: '#2AAAAC',
			padding: '0.5rem 0.7rem',
			borderRadius: '20px',
			color: '#ffffff',
			display: 'inline-block',
			fontSize: '0.7rem',
		},
	},
	logoWrapper: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		'& img': {
			height: '70px',
		},
	},
	numbersWrapper: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		'& div': {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	text: {
		fontSize: '0.7rem',
		color: '#929292',
	},
	value: {
		fontSize: '0.7rem',
		fontWeight: 'bold',
	},
	description: {
		fontSize: '0.9rem',
		lineHeight: 1.4,
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
		padding: '1rem',
		boxSizing: 'border-box',
	},
	textWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: '#ffffff',
		'& span': {
			fontWeight: 'bold',
			lineHeight: 1.3,
		},
	},
	smallText: {
		fontSize: '0.7rem',
	},
}));
export default useStyles;
