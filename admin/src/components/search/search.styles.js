import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	label: {
		color: theme.fontColor,
		fontSize: '0.8rem',
	},
	parent: {
		maxHeight: '30vh',
		overflowY: 'auto',
	},
	item: {
		padding: '0.5rem',
		width: '30vw',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.fontColor,
		},
		[theme.breakpoints.down('sm')]: {
			width: '80vw',
		},
	},
}));
export default useStyles;
