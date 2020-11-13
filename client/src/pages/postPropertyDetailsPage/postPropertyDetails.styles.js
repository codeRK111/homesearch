import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '60vw',
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			width: '90vw',
		},
	},
}));
export default useStyles;
