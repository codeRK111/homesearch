import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	border: {
		flexGrow: 1,
		height: 1,
		background: '#cccccc',
	},
}));
export default useStyles;
