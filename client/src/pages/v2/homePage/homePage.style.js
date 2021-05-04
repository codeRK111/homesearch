import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		backgroundColor: theme.shadowColor,
		padding: '1.5rem',
	},
	componentSpacer: {
		marginTop: '10vh',
	},
	componentPadding: {
		padding: `0 1rem 0 ${theme.leftPaddingMedium}`,
	},
}));
export default useStyles;
