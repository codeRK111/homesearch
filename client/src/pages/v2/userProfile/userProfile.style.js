import img from '../../../assets/buildings.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: '0.8rem',
		},
	},
	pagePadding: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
	},
	profileWrapper: {
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
			minHeight: '50vh',
		},
		[theme.breakpoints.down('sm')]: {
			// minHeight: '300vh',
			height: '100% !important',
		},
	},
	overlay: {
		[theme.breakpoints.up('sm')]: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(255,255,255,0.8)',
			zIndex: 2,
			padding: '0 1rem 0 0',
			boxSizing: 'border-box',
		},
		[theme.breakpoints.down('sm')]: {
			height: '100%',
		},
	},
	heroWrapper: {
		padding: `4rem 2rem 2rem ${theme.leftPaddingMedium}`,
		[theme.breakpoints.down('sm')]: {
			padding: '0.8rem',
			height: '100%',
		},
	},
	avatarWrapper: {
		position: 'relative',
		height: '150px',
		width: '150px',
		display: 'inline-block',
	},
	avatar: {
		height: '150px',
		width: '150px',
		position: 'absolute',
		borderRadius: 20,
		right: 10,
	},
	commentIcon: {
		position: 'absolute',
		height: 30,
		width: 30,
		borderRadius: '50%',
		background: '#FA9B0B',
		fontSize: '2rem',
		fontWeight: 'bolder',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		right: 0,
		bottom: 0,
	},
	avatarReviewWrapper: {
		position: 'relative',
		height: '75px',
		width: '92px',
		display: 'inline-block',
	},
	avatarReview: {
		height: '80px',
		width: '80px',
		position: 'absolute',
	},
	commentReviewIcon: {
		position: 'absolute',
		height: 30,
		width: 30,

		borderRadius: '50%',
		background: '#FA9B0B',
		fontSize: '2rem',
		fontWeight: 'bolder',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		right: 0,
		bottom: 0,
	},
	slideSelected: {
		height: 5,
		width: 30,
		margin: '0 0.3rem',
		background: '#FA9B0B',
		borderRadius: 3,
	},
	slide: {
		height: 5,
		width: 30,
		margin: '0 0.3rem',
		background: '#cccccc',
		borderRadius: 3,
	},
	commentWrapper: {
		marginTop: '2rem',
		width: '100%',
		boxSizing: 'border-box',
		padding: '0.5rem',
	},
	comment: {
		width: '100%',
		background: '#ffffff',
		border: 'none',
		minHeight: 100,
		boxShadow:
			'inset 2.7px 2.7px 6px #A3A3A3, inset -2.7px -2.7px 6px #FFFFFF',
		borderRadius: 20,
		padding: '1rem',
		fontSize: '1rem',
		boxSizing: 'border-box',
		'&:focus': {
			outline: 'none',
		},
		'&::placeholder': {
			color: theme.primaryHeadingColor,
			fontWeight: 700,
			fontSize: '0.9rem',
		},
	},

	ownerType: {
		background: theme.utilColor,
		color: '#ffffff',
		fontSize: '0.7rem',
		padding: '0.5rem 1rem',
		borderRadius: 15,
	},
	numberWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',

		'& h1': {
			margin: 0,
			padding: '0.5rem',
		},
	},
	numberHiglight: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: 60,
		width: 70,
		background: theme.utilColor,

		'& h2': {
			margin: 0,
			padding: 0,
		},
	},
	propertiesWrapper: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
	},
	scrollbar: {
		display: 'flex',
		flex: 1,
	},
	scrollbarRight: {
		display: 'flex',
		flex: 1,
		justifyContent: 'flex-end',
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
	content: {
		display: 'flex',
		flex: 12,
		padding: '0 1rem',
	},
	reviewWrapper: {
		borderRadius: 20,
		background: '#ffffff',
		boxShadow: '5px 5px 14px #a6a6a6,-5px -5px 14px #ffffff',
		padding: '1rem',
	},
	keyNumberSpacer: {
		marginLeft: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '0.8rem',
			marginLeft: 0,
		},
	},
	iconColor: {
		color: theme.utilColor,
	},
	container: {
		background: 'rgba(0,0,0,0.5)',
		boxSizing: 'border-box',
		overflow: 'auto',
		zIndex: 1000,
	},
	paper: {
		background: theme.shadowColor,
		boxSizing: 'border-box',
		overflow: 'auto',
		borderRadius: 30,
	},
	button: {
		cursor: 'pointer',
		background: theme.shadowColor,
		display: 'flex',
		minWidth: '75px',
		justifyContent: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '1rem 3rem',
		border: 'none',
	},
	otp: {
		padding: '0.9rem',
		margin: '0.9rem',
		fontSize: '1.2rem',
		border: '3px solid #c1c1c1',
		borderRadius: '5px',
		[theme.breakpoints.down('md')]: {
			padding: '0.7rem',
			margin: '0.7rem',
			fontSize: '1rem',
			border: '2px solid #c1c1c1',
			borderRadius: '4px',
		},
	},
	uploadMore: {
		display: 'flex',
		justifyContent: 'center',
		boxSizing: 'border-box',
		alignItems: 'center',
		border: `2px dotted ${theme.utilColor}`,
		cursor: 'pointer',
		height: 150,
		width: 150,
	},
	uploadButton: {
		display: 'none',
	},
	imageWrapper: {
		borderRadius: 10,
		overflow: 'hidden',
		border: `4px solid ${theme.utilColor}`,
		padding: '0.2rem',
		boxSizing: 'border-box',
		position: 'relative',
	},
	overlayProfilePhoto: {
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
		justifyContent: 'space-between',
		padding: '0.5rem',
		boxSizing: 'border-box',
	},
	image: {
		width: '100%',
		height: '150px',
	},
}));
export default useStyles;
