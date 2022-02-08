import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
		[theme.breakpoints.up('sm')]: {
			padding: '2rem',
		},
	},
}));
export default useStyles;
