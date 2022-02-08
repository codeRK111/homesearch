import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: theme.shadowColor,
		cursor: 'pointer',
		display: 'flex',
		minWidth: '75px',
		justifyContent: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
		'&>span': {
			fontWeight: '600',
			textShadow: '0px 0.07px, 0.07px 0px, 0.07px 0.07px',
			letterSpacing: 1,
		},
	},
	outlinedPrimary: {
		color: theme.utilColor,
		border: `1px solid ${theme.utilColor}`,
	},
	chipText: {
		fontSize: '0.8rem',
	},
	selected: {
		background: theme.utilColor,
	},
}));
export default useStyles;
