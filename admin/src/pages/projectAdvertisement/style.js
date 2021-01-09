import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '400px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
}));
export default useStyles;
