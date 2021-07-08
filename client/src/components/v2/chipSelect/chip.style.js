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
		fontSize: '0.8rem',
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
	wrapperFullWidth: {
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		height: 35,
		width: '100%',
		cursor: 'pointer',
		fontSize: '0.8rem',
		'&>span': {
			fontWeight: '600',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.7rem',
			width: '100%',
			borderRadius: '15px',
			boxShadow: '7px 7px 15px #acacac,-7px -7px 15px #ffffff',
		},
	},
	selected: {
		background: theme.utilColor,
	},
}));
export default useStyles;
