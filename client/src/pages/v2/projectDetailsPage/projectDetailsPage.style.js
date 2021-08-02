import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: `1rem`,
		},
	},
	filterWrapper: {
		borderRadius: '20px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		padding: '1rem',
	},
	filter: {
		minHeight: '50px',
		borderRight: '2px solid #b9b9b9',
	},
	mapWrapper: {
		width: '100%',
		height: 400,
		borderRadius: 20,
		border: '1px solid black',
		marginTop: '2rem',
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
	likeIcon: {
		height: '1rem',
	},
	likeValue: {
		fontSize: '0.8rem',
	},
	divider: {
		height: 3,
		width: '100%',
		background: '#c1c1c1',
		borderRadius: 1,
		margin: '2rem 0',
	},
	utilsWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 300,
		padding: '1rem',
		background: theme.shadowColor,
		boxShadow: '9px 9px 18px #9f9f9f, -9px -9px 18px #ffffff',
		borderRadius: 30,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	utilsIcon: {
		height: '2rem',
	},
	comment: {
		width: '100%',
		background: theme.shadowColor,
		border: 'none',
		minHeight: 100,
		boxShadow: 'inset 6px 6px 12px #c3c3c3,inset -6px -6px 12px #fdfdfd',
		borderRadius: 40,
		fontSize: '1rem',
		padding: '1rem 1rem 1rem 2rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
		},
		'&:focus': {
			outline: 'none',
		},
		'&::placeholder': {
			color: theme.primaryHeadingColor,
			fontWeight: 700,
			fontSize: '1.5rem',
			[theme.breakpoints.down('sm')]: {
				fontWeight: 600,
				fontSize: '1rem',
			},
		},
	},
	commentWrapper: {
		display: 'flex',
		boxSizing: 'border-box',
		'& p': {
			paddingLeft: '1rem',
			fontSize: '0.8rem',
			maxWidth: 400,
		},
	},
	avatarWrapper: {
		position: 'relative',
		height: '50px',
		width: '65px',
		display: 'inline-block',
	},
	avatar: {
		height: '60px',
		width: '60px',
		position: 'absolute',
	},
	commentIcon: {
		position: 'absolute',
		height: 20,
		width: 20,

		borderRadius: '50%',
		background: '#FA9B0B',
		fontSize: '1.5rem',
		fontWeight: 'bolder',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		right: 0,
		bottom: 0,
	},
	rightWrapper: {
		background: theme.shadowColor,
		borderRadius: 50,
		boxShadow: '20px 20px 40px #969696,-20px -20px 40px #ffffff',
		padding: '1rem',
		// position: 'fixed',
	},
	ownerInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& h2': {
			margin: 0,
			padding: '0.5rem 0',
			fontSize: '1.2rem',
		},
	},
	ownerType: {
		background: theme.secondaryHeadingColor,
		color: '#ffffff',
		fontSize: '0.7rem',
		padding: '0.5rem 1rem',
		borderRadius: 15,
	},
	ownerId: {
		fontWeight: 600,
		textTransform: 'uppercase',
		color: '#c1c1c1',
	},
	borderRight: {
		borderRight: '2px solid #c1c1c1',
		padding: '0 0.7rem',
	},
	ownerIcon: {
		height: 20,
	},
	iconPadding: {
		padding: '0 0.7rem',
	},
	cardMediaMediun: {
		height: 200,
		borderRadius: 20,
	},
	cardMedia: {
		height: 120,
		borderRadius: 20,
	},

	floorPlanWrapper: {
		padding: '1.5rem 2.5rem',
		borderRadius: 30,
		background: theme.shadowColor,
		boxShadow: ' 6px 6px 12px #b1b1b1,-6px -6px 12px #ffffff',
		[theme.breakpoints.down('sm')]: {
			padding: '1rem',
		},
	},
	floorPlanNameWrapper: {
		padding: '1rem',
		borderRadius: 20,
		background: theme.shadowColor,
		boxShadow: 'inset 5px 5px 10px #c1c1c1,inset -5px -5px 10px #ffffff',
		overflow: 'auto',
		height: 300,

		'&::-webkit-scrollbar': {
			width: 20,
		},
		'&::-webkit-scrollbar-track': {
			width: 20,
			boxShadow: '0 0 5px gray',
			borderRadius: 20,
		},
		'&::-webkit-scrollbar-thumb': {
			width: 22,
			height: 20,
			borderRadius: 20,
			background: theme.shadowColor,
			boxShadow: '5px 5px 10px #c1c1c1,-5px -5px 10px #ffffff',
		},
	},
	fPlan: {
		width: '100%',
		height: '100%',
		backgroundSize: 'contain',
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
	},
	planTypeWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '0 0.5rem 0.5rem 0.5rem ',
		cursor: 'pointer',
		'& img': {
			width: 20,
			height: 20,
		},
	},
	planSelected: {
		borderBottom: `4px solid ${theme.utilColor}`,
	},
	propertyTitle: {
		padding: '0.5rem',
		'&:hover': {
			background: '#cccccc',
			cursor: 'pointer',
		},
	},
}));
export default useStyles;
