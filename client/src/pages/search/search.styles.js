import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
	searchWrapper: {
		paddingLeft: '5rem',
		paddingTop: '3rem',
		paddingBottom: '3rem',
	},
	searchBoxWrapper: {
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
		maxWidth: '800px',
	},
	resultsWrapper: {
		padding: '1rem 1rem 1rem 5rem',
		backgroundColor: theme.bgColor,
	},
	input: {
		width: '100%',
		fontSize: '1.3rem',
		border: 'none',
		paddingLeft: '1rem',
		'&:focus': {
			outline: 'none',
		},
	},
}));

export default styles;
