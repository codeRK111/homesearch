import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	paper: {
		background: theme.shadowColor,
		borderRadius: 30,
	},
	label: {
		color: theme.primaryHeadingColor,
		fontWeight: 600,
	},
}));
export default useStyles;
