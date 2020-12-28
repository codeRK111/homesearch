import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: '4rem',
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
		fontWeight: 'bold',
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between',
		},
	},
	lastWord: {
		color: theme.colorOne,
		fontWeight: 'bold',
	},
	titleWrapper: {
		cursor: 'pointer',
	},
}));
