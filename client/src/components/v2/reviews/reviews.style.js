import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	imageWrapper: {
		position: 'relative',
	},
	messageWrapper: {
		width: '100%',
		marginLeft: '1rem',
	},
	messageInfoWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: '0.7rem',
	},
	userName: {
		padding: 0,
		margin: 0,
		fontSize: '0.7rem',
		fontWeight: 'bold',
	},
	date: {
		padding: 0,
		margin: 0,
		fontSize: '0.7rem',
		fontWeight: '500',
	},
	userPhoto: {
		borderRadius: '50%',
		width: 70,
		height: 70,
	},
	commentIcon: {
		width: 25,
		height: 25,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	moreWrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
}));
export default useStyles;
