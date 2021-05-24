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
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			padding: '1rem',
		},
	},
	flexWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem',
		},
	},
	number: {
		color: theme.secondaryHeadingColor,
		fontWeight: 'bold',
		fontSize: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		},
	},
	text: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		},
	},
}));
export default useStyles;
