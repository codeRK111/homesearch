import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '60vw',
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			width: '90vw',
		},
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
}));
export default useStyles;
