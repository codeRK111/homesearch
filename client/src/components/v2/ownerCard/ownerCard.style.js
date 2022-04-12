import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	rightWrapper: {
		background: theme.shadowColor,
		borderRadius: 30,
		boxShadow: '20px 20px 40px #969696,-20px -20px 40px #ffffff',
		padding: '1rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		boxSizing: 'border-box',
		// position: 'fixed',
	},
	avatarWrapper: {
		position: 'relative',
		height: '60px',
		width: '60px',
		display: 'inline-block',
		marginRight: '1rem',
	},
	avatarRoot: {
		width: '100%',
		height: '100%',
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
	ownerType: {
		background: theme.secondaryHeadingColor,
		color: '#ffffff',
		fontSize: '0.7rem',
		padding: '0.5rem 1rem',
		borderRadius: 15,
	},
	ownerName: {
		textAlign: 'center',
	},
	ownerInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& h2': {
			margin: 0,
			padding: '0.3rem 0',
			fontSize: '1.2rem',
		},
	},
	ownerIcon: {
		height: 20,
	},
	borderRight: {
		borderRight: '2px solid #c1c1c1',
		padding: '0 0.7rem',
	},
	iconPadding: {
		padding: '0 0.7rem',
	},
	agentID: {
		color: '#a7a6a6',
		fontWeight: 'bold',
		fontSize: '0.8rem',
		// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
		letterSpacing: 1,
	},
}));
export default useStyles;
