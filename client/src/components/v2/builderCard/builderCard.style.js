import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 21px #bebebe,-12px -12px 21px #ffffff',
		boxSizing: 'border-box',
	},
	developerName: {
		textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
		textAlign: 'center',
		fontSize: '1.4rem',
		margin: 0,
		padding: 0,
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
			fontWeight: 'bold',
		},
	},
	logoWrapper: {
		padding: '0 1rem',
		boxSizing: 'bordered-box',
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
		fontSize: '0.8rem',
		color: '#929292',
		fontWeight: 'bolder',
	},
	value: {
		fontSize: '0.8rem',
		fontWeight: 'bold',
		textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
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
		borderRadius: 40,
		padding: '1rem',
		boxSizing: 'border-box',
	},
	textWrapper: {
		padding: '1rem',
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
