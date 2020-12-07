import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	label: {
		color: theme.fontColor,
		fontSize: '0.8rem',
	},
	root: {
		padding: 0,
	},
	checkboxRoot: {
		padding: 0,
	},
}));
export default useStyles;
