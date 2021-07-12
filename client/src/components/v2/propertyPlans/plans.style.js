import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		background: 'rgba(0,0,0,0.5)',
		boxSizing: 'border-box',
		overflow: 'auto',
	},
	paper: {
		background: theme.shadowColor,
		boxSizing: 'border-box',
		overflow: 'auto',
		borderRadius: 30,
	},
	contentWrapper: {
		padding: '1.5rem',
		boxSizing: 'border-box',
	},
	heading: {
		margin: '0.5rem 0',
	},
	line: {
		flex: 1,
		width: '100%',
		height: 1,
		background: '#cccccc',
	},
	warningWrapper: {
		padding: '1rem',
		border: '1px solid red',
		borderRadius: 10,
		boxSizing: 'border-box',
	},
	slideWrapper: {
		boxSizing: 'border-box',
	},
	button: {
		border: 'none',
		padding: '1rem 2rem',
		borderRadius: 10,
		marginRight: '1rem',
		background: theme.shadowColor,
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
	},
	detailsButton: {
		border: 'none',
		padding: '0.5rem 1rem',
		borderRadius: 20,
		background: theme.shadowColor,
		boxShadow: '5px 5px 10px #a6a6a6,-5px -5px 10px #ffffff',
		fontSize: '0.7rem',
		'&:hover': {
			background: theme.utilColor,
		},
	},
}));
export default useStyles;
