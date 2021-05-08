import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	iconWrapper: {
		background: theme.shadowColor,
		borderRadius: 41,
		boxShadow: '6px 6px 12px #a6a6a6,-6px -6px 12px #ffffff',
		marginRight: '1rem',
		height: 30,
		width: 30,
	},
}));
export default useStyles;
