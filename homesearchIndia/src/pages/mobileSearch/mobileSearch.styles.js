import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	locationWrapper: {
		padding: '1rem',
		backgroundColor: theme.fontColorThree,
	},
	searchWrapper: {
		padding: '1rem',
	},
	locationButton: {
		border: 'none',
		color: theme.colorTwo,
		backgroundColor: 'transparent',
	},
	searchInput: {
		border: 'none',
		width: '100%',
		paddingLeft: '1rem',
		'&:focus': {
			outline: 'none',
		},
	},
	searchIcon: {
		color: '#cccccc',
		fontSize: '1.3rem',
	},
	popperButton: {
		padding: '0.8rem 1.5rem',
	},
	filterWrapper: {
		padding: '1rem',
	},
	unitOption: {
		cursor: 'pointer',
		maxWidth: '100px',
		height: '50px',
		border: '1px solid #cccccc',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	unitOptionFullWidth: {
		cursor: 'pointer',
		width: '230px',
		height: '50px',
		border: '1px solid #cccccc',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	selected: {
		backgroundColor: theme.colorOne,
		color: '#ffffff',
	},
	root: {
		backgroundColor: '#ffffff',
	},
	positionFixed: {
		bottom: 0,
		position: 'fixed',
		top: 'auto',
	},
	iconWrapper: {
		backgroundColor: '#ffffff',
		paddingRight: '1rem',
	},
	selectedCityWrapper: {
		padding: '0.5rem',
		margin: '1rem',
	},
	chip: {
		marginRight: '0.5rem',
	},
}));
