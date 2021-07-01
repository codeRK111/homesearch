import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	gridWrapper: {
		borderRadius: 10,
		background: theme.shadowColor,
		border: '2px solid #cccccc',
		cursor: 'pointer',
	},
	selected: {
		border: `4px solid ${theme.utilColor} !important`,
	},
}));
export default useStyles;
