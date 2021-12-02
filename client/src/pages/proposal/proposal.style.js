import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	commentWrapper: {
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 500,
		},
	},
}));
export default useStyles;
