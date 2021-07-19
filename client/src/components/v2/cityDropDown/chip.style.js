import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'center',
		minWidth: '75px',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
		cursor: 'pointer',
		'&>span': {
			fontWeight: '600',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.7rem',
			minWidth: '50px',
			borderRadius: '15px',
			boxShadow: '7px 7px 15px #acacac,-7px -7px 15px #ffffff',
		},
	},
	selected: {
		background: theme.utilColor,
	},
	optionWrapper: {
		width: '100%',
		padding: '0.5rem',
		color: '#000000',
		cursor: 'pointer',
		boxSizing: 'border-box',
		borderRadius: '10px',
		display: 'flex',
		justifyContent: 'flex-start',
		fontSize: '1rem',
		'&:hover': {
			background: theme.utilColor,
		},
	},
	tooltip: (size) => ({
		background: theme.shadowColor,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxHeight: size * 2,
		overflow: 'auto',
		minWidth: size,
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
		cursor: 'pointer',
	}),
	shadow: {
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		minWidth: '75px',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
		cursor: 'pointer',
	},
	input: {
		padding: '0.6rem',
		border: 'none',
		background: theme.shadowColor,
		borderRadius: 15,
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		'&:focus': {
			outline: 'none',
		},
		boxSizing: 'border-box',
	},
	noResult: {
		color: '#000000',
	},
}));
export default useStyles;
