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
	colorSecondary: {},
	input: {
		padding: '1rem',
		width: '100%',
		border: 'none',
		background: theme.shadowColor,
		borderRadius: 10,
		boxSizing: 'border-box',
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		'&:focus': {
			outline: 'none',
		},
	},
}));
export default useStyles;
