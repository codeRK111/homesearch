import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	formWrapper: {
		width: 500,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	chipWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
}));
export default useStyles;
