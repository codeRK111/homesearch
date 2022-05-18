import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	otp: {
		padding: '0.9rem',
		margin: '0.9rem',
		fontSize: '1.2rem',
		border: '3px solid #c1c1c1',
		borderRadius: '5px',
		[theme.breakpoints.down('md')]: {
			padding: '0.7rem',
			margin: '0.7rem',
			fontSize: '1rem',
			border: '2px solid #c1c1c1',
			borderRadius: '4px',
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
	dialogWrapper: {
		borderRadius: 20,
	},
}));
export default useStyles;
