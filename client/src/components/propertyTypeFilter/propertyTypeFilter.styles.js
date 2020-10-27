import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	wrapper: {
		border: '1px solid #cccccc',
		width: '150px',
		height: '50px',
	},
	buttonWrapper: {
		cursor: 'pointer',
	},
	valueWrapper: {
		maxWidth: '150px',
		padding: '0.5rem',
		boxSizing: 'border-box',
	},
}));
