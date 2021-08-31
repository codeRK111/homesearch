import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		boxSizing: 'border-box',
		display: 'flex',
		// justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center',
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
		border: 'none',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
			width: '50px',
		},
	},
	cardArea: {
		flex: 1,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '100%',
		},
	},
}));
export default useStyles;
