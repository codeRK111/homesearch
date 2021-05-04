import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem ${theme.leftPaddingMedium}`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: 32,
		background: theme.shadowColor,
		boxShadow: '10px 10px 20px #8f8f8f,-10px -10px 20px #ffffff',
	},
	flexWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	number: {
		color: theme.secondaryHeadingColor,
		fontWeight: 'bold',
		fontSize: '1.5rem',
	},
	text: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
	},
}));
export default useStyles;
