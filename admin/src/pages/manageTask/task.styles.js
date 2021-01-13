import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	schedule: {
		backgroundColor: '#f1c40f',
	},
	closed: {
		backgroundColor: '#16a085',
		color: '#ffffff',
	},
	denied: {
		backgroundColor: '#e74c3c',
		color: '#ffffff',
	},
	addButtonWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'flex-end',
	},
}));
export default useStyles;
