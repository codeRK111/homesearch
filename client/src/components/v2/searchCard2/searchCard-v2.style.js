import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		marginTop: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: 0,
		},
	},
}));
export default useStyles;
