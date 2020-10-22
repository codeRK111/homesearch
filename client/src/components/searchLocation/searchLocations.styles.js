import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	locationListWrapper: {
		padding: '1rem',
		height: '400px',
		overflowX: 'scroll',
		[theme.breakpoints.down('sm')]: {
			height: '200px',
		},
	},
	locationWrapper: {
		padding: '0.5rem',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#cccccc',
		},
	},
	locationIcon: {
		color: theme.colorTwo,
		fontSize: '14px',
		marginRight: '0.2rem',
	},
}));
