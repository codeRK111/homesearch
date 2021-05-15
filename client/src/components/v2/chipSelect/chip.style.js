import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'center',
		minWidth: '75px',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '0.6rem',
		cursor: 'pointer',
		'&>span': {
			fontWeight: '600',
		},
	},
}));
export default useStyles;
