import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	pageWrapper: {
		padding: theme.spacing(2),
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			width: '80%',
			padding: theme.spacing(1),
		},
	},
	skeleton: {
		height: 200,
		width: '100%',
	},
}));
export default useStyles;
