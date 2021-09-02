import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	comment: {
		width: '100%',
		background: theme.shadowColor,
		border: 'none',
		minHeight: 100,
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		borderRadius: 20,
		fontSize: '1rem',
		padding: '1rem 1rem 1rem 2rem',
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
			borderRadius: 20,
			boxShadow:
				'inset 6px 6px 11px #b3b3b3,inset -6px -6px 11px #ffffff',
		},
		'&:focus': {
			outline: 'none',
		},
		'&::placeholder': {
			color: theme.primaryHeadingColor,
			fontWeight: 700,
			fontSize: '1.5rem',
			[theme.breakpoints.down('sm')]: {
				fontWeight: 600,
				fontSize: '1rem',
			},
		},
	},
	button: {
		cursor: 'pointer',
		background: theme.shadowColor,
		display: 'flex',
		minWidth: '75px',
		justifyContent: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '1rem 3rem',
		border: 'none',
	},
	loader: {
		marginLeft: '0.5rem',
	},
}));
export default useStyles;
