import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	iconWrapper: {
		background: theme.shadowColor,
		borderRadius: 41,
		boxShadow: '6px 6px 12px #a6a6a6,-6px -6px 12px #ffffff',
		marginRight: '1rem',
		height: 30,
		width: 30,
		[theme.breakpoints.down('sm')]: {
			height: 20,
			width: 20,
		},
	},
	innerPadding: {
		padding: '0.3rem',
		boxSizing: 'border-box',
	},
	point: {
		height: '100%',
		width: '100%',
		borderRadius: '50%',
		background: theme.utilColor,
	},
	text: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
}));
export default useStyles;
