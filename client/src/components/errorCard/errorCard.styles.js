import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '100%',
		height: '20rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cRed: {
		color: 'red',
	},
	center: {
		textAlign: 'center',
	},
	icon: {
		color: 'red',
		fontSize: '2rem',
	},
}));
export default useStyles;
