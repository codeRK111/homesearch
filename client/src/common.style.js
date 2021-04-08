import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	justifyCenter: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	},
	alignCenter: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	flexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	successMessage: {
		color: 'green',
		fontSize: '1.2rem',
		fontWeight: 500,
		textAlign: 'center',
	},
	errorMessage: {
		color: 'red',
		fontSize: '1.2rem',
		fontWeight: 500,
		textAlign: 'center',
	},
	lightBackground: {
		backgroundColor: '#ecf0f1',
	},
}));
