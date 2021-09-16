import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	drawerWrapper: {
		width: 300,
		padding: theme.spacing(2),
		[theme.breakpoints.down]: {
			width: '80%',
			padding: theme.spacing(1),
		},
	},
}));
export default useStyles;
