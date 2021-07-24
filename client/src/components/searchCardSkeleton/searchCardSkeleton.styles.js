import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		padding: '1rem',
	},
	fullArea: {
		height: '100%',
		width: '100%',
	},
}));
export default useStyles;
