import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	cardWrapper: {
		width: '100%',
	},
	image: {
		height: 300,
	},
	link: {
		textDecoration: 'none',
		color: '#000000',
		fontSize: 18,
		fontWeight: 'bold',
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
			color: theme.utilColor,
		},
	},
}));
export default useStyles;
