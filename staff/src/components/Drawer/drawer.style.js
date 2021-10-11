import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	drawerWrapper: {
		width: 400,
		padding: theme.spacing(2),
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			width: '90%',

			padding: '0.3rem',
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
