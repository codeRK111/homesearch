import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	tableCardHeader: {
		backgroundColor: '#ecf0f1',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: '1.2rem',
		padding: '0.3rem',
	},
	tableWrapper: {
		maxHeight: '300px',
		overflow: 'auto',
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	alertWrapper: {
		minWidth: '500px',
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
}));
export default useStyles;
