import img from '../../assets/buildings.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	main: {
		boxSizing: 'border-box',
		height: '100%',
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			position: 'relative',
			backgroundImage: `url("${img}")`,
			backgroundRepeat: 'no-repeat',
			backgroundColor:
				theme.palette.type === 'light'
					? theme.palette.grey[50]
					: theme.palette.grey[900],
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			minHeight: '70vh',
		},
		[theme.breakpoints.down('sm')]: {
			// minHeight: '300vh',
			height: '100% !important',
		},
	},
	bgOverlay: {
		[theme.breakpoints.up('sm')]: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(255,255,255,0.9)',
			zIndex: 2,
			padding: '0 1rem 0 0',
			boxSizing: 'border-box',
		},
		[theme.breakpoints.down('sm')]: {
			height: '100%',
		},
	},
	mainInfoWrapper: {
		zIndex: 3,
		position: 'relative',
		paddingTop: '1rem',
	},
	realtorPhoto: {
		height: 150,
		width: 150,
		borderRadius: 20,
		border: '3px solid #ffffff',
	},
	ownerType: {
		background: theme.utilColor,
		color: '#ffffff',
		fontSize: '0.7rem',
		padding: '0.5rem 1rem',
		borderRadius: 15,
		display: 'inline-block',
		fontWeight: 'bold',
	},
	ownerName: {
		padding: 0,
		margin: '0.5rem 0',
		color: theme.primaryHeadingColor,
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
	ownerAddress: {
		fontSize: '1.1rem',
		color: theme.primaryHeadingColor,
		letterSpacing: 1,
	},
	ownerSpecialist: {
		color: theme.utilColor,
		letterSpacing: 1,
		fontWeight: 'bold',
	},
	ownerFooterWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.up('xs')]: {
			marginTop: '2rem',
		},
	},
	chipBorder: {
		border: `2px solid ${theme.yellowColor} !important`,
	},
	colorYellow: {
		color: theme.yellowColor,
	},
	numberWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',

		'& h2': {
			color: theme.utilColor,
			letterSpacing: 1,
			fontWeight: 'bold',
			padding: 0,
			margin: '0.5rem 0',
		},
		'& span': {
			color: '#929292',
			letterSpacing: 1,
			fontWeight: 'bold',
		},
	},

	animContainer: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',

		'& div': {
			width: '60%',
			minHeight: '75px',
			background: theme.utilColor,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: '1rem',
			transition: 'transform 0.3s',

			'&:hover': {
				transform: 'scale(1.3,1.1)',
				backgroundColor: theme.yellowColor,
			},

			'& h3': {
				padding: 0,
				margin: 0,
				fontSize: '1.5rem',
			},
		},
	},
	scrollWrapper: {
		height: '75px',
		width: '75px',
		borderRadius: '50%',
		background: theme.shadowColor,
		boxShadow: '7px 7px 14px #bebebe,-7px -7px 14px #ffffff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapperClassName: {
		display: 'flex',
		alignItems: 'center',
	},
}));
export default useStyles;
