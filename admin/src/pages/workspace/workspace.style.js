import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	iconWrapper: {
		backgroundColor: '#34495e',
		minHeight: '6rem',
	},
	icon: {
		fontSize: '3rem',
		color: '#f1c40f',
	},
	label: {
		fontSize: '0.9rem',
		color: '#7f8c8d',
	},
	info: {
		fontSize: '1.1rem',
		padding: '0.3rem 0',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textCenter: {
		textAlign: 'center',
	},
}));
export default useStyles;
