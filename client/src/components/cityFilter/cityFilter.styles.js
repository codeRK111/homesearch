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
		minWidth: '150px',
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
	input: {
		border: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	cRed: {
		color: 'red',
	},
	searchWrapper: {
		display: 'flex',
		border: '1px solid #cccccc',
		margin: '0.3rem',
		alignItems: 'center',
	},
}));
