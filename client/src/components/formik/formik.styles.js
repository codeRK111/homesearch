import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	label: {
		fontSize: '0.8rem',
	},
	root: {
		padding: 0,
	},
	checkboxRoot: {
		padding: 0,
	},
	colorSecondary: {
		color: theme.utilColor,
	},
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
	checked: {
		color: `${theme.utilColor} !important`,
	},
}));
export default useStyles;
