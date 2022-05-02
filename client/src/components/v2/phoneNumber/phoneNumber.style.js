import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		color: '#ffffff',
	},
	link: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginLeft: '1rem',
	},
}));
export default useStyles;
