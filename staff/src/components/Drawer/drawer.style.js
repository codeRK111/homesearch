import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	drawerWrapper: {
		width: 300,
		padding: theme.spacing(2),
		boxSizing: 'border-box',
		[theme.breakpoints.down]: {
			width: '80%',
			padding: theme.spacing(1),
		},
	},
	selectedRoute: {
		background: theme.palette.primary.main,
		color: '#ffffff',
		borderRadius: 10,
	},
	colorWhite: {
		color: '#ffffff',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));
export default useStyles;
