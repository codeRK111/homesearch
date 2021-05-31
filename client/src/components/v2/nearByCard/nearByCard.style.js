import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '0.4rem 0.4rem 0.8rem 0.4rem',
		background: theme.shadowColor,
		borderRadius: '20px',
		boxShadow: '16px 16px 26px #cacaca,-16px -16px 26px #f6f6f6',
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
		height: '12vh',
		width: '100%',
		borderRadius: 20,
	}),

	dateWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.secondaryHeadingColor,
		padding: '0.5rem 1rem',
		color: '#ffffff',
		maxHeight: '50px',
		borderRadius: 20,
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',

		'& h4': {
			padding: '0.4rem 0',
			margin: 0,
		},
		'& h6': {
			padding: 0,
			margin: 0,
		},
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
		},
		'& img': {
			height: '12px',
		},
	},
	title: {
		margin: 0,
		padding: 0,
		fontSize: '1vw',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		},
	},
	description: {
		fontSize: '0.7rem',
		lineHeight: 1.3,
	},
	rotate: {
		transform: 'rotate(-30deg)',
	},
}));
export default useStyles;
