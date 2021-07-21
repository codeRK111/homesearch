import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	propertyHeaderWrapper: {
		padding: '0.7rem 0.7rem 1.2rem 0.7rem',
		background: theme.shadowColor,
		borderRadius: '32px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		marginTop: '2rem',
	},
	imageWrapper: {
		width: '100%',
		height: '100%',
	},
}));
export default useStyles;
