import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.shadowColor,
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		border: 'none',
		outline: 0,
		padding: '0.5rem',
		borderRadius: 10,
	},
	focused: {
		outline: 0,
	},
	icon: {
		color: theme.utilColor,
	},
	input: {
		marginLeft: 5,
	},
}));
export default useStyles;
