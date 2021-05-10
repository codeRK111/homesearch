import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
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
	},
	utilsIcon: {
		height: '2rem',
	},
	comment: {
		width: '100%',
		background: theme.shadowColor,
		border: 'none',
		minHeight: 100,
		boxShadow:
			'inset 11px 11px 23px #b3b3b3,inset -11px -11px 23px #ffffff',
		borderRadius: 50,
		fontSize: '1rem',
		padding: '1rem 1rem 1rem 2rem',
		'&:focus': {
			outline: 'none',
		},
		'&::placeholder': {
			color: theme.primaryHeadingColor,
			fontWeight: 700,
			fontSize: '1.5rem',
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
		height: '75px',
		width: '92px',
		display: 'inline-block',
	},
	avatar: {
		height: '80px',
		width: '80px',
		position: 'absolute',
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
}));
export default useStyles;
