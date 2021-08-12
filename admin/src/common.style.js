import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles((theme) => ({
	justifyCenter: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	},
	justifyBetween: {
		display: 'flex',
		justifyContent: 'space-between',
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
	buttonFullHeight: {
		display: 'inline-block',
		height: '100%',
	},
	errorColor: {
		color: 'red',
	},
	flexGrow: {
		flexGrow: 1,
	},
}));

export default useGlobalStyles;
