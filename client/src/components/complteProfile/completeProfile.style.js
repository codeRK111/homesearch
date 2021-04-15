import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: 700,
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	progressBar: {
		height: 10,
	},
}));
export default useStyles;
