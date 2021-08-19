import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	formWrapper: {
		width: 500,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
}));
export default useStyles;
