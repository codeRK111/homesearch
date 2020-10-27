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
		fontSize: '0.9rem',
		padding: '0.5rem',
		boxSizing: 'border-box',
		maxHeight: '300px',
		overflowY: 'auto',
	},
	priceWrapper: {
		padding: '0.5rem',
		textAlign: 'center',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#cccccc',
		},
	},
}));
