import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: theme.shadowColor,
		display: 'flex',
		minWidth: '75px',
		justifyContent: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
		'&>span': {
			fontWeight: '600',
		},
	},
	outlinedPrimary: {
		color: theme.utilColor,
		border: `1px solid ${theme.utilColor}`,
	},
	chipText: {
		fontSize: '0.8rem',
	},
}));
export default useStyles;
