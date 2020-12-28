import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	wrapper: {
		border: '1px solid #cccccc',
		width: '100%',
		height: '100%',
	},
	buttonWrapper: {
		cursor: 'pointer',
	},
	valueWrapper: {
		maxWidth: '180px',
		padding: '0.5rem',
		boxSizing: 'border-box',
	},
}));
