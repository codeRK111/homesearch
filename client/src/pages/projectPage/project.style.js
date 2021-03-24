import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	wrapper: {
		marginTop: '5rem',
		padding: '0 2rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0 1rem',
		},
	},
}));
