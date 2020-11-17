import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '60vw',
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			width: '90vw',
		},
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	imageWrapper: {},
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
	removeButton: {
		marginBottom: '0.5rem',
		marginTop: '0.5rem',
	},
	formLabel: {
		color: theme.fontColor,
		fontSize: '0.8rem',
	},
	relative: {
		position: 'relative',
	},
	absolute: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		maxHeight: '100px',
	},
	item: {
		padding: '0.5rem',
		width: '30vw',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.fontColor,
		},
	},
}));
export default useStyles;
