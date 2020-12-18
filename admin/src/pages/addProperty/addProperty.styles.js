import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	image: {
		width: '100px',
		height: '100px',
	},
	input: {
		display: 'none',
	},
	label: {
		padding: '0.5rem 1.7rem',
		border: '1px solid #cccccc',
		width: '100%',
		borderRadius: '5px',
		backgroundColor: '#cccccc',
		cursor: 'pointer',
	},
}));
export default useStyles;
