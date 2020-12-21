import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	addWrapper: {
		width: '500px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
}));
export default useStyles;
