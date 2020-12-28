import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		border: `1px solid ${theme.colorOne}`,
		cursor: 'pointer',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	center: {
		textAlign: 'center',
	},
}));
export default useStyles;
