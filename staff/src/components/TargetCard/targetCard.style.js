import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	iconWrapper: {
		width: 100,
		height: 100,
		background: theme.palette.warning.main,
		borderRadius: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: '4rem',
		color: '#ffffff',
	},
	borderRed: {
		border: '3px solid red',
	},
	borderGreen: {
		border: '3px solid green',
	},
}));
export default useStyles;
