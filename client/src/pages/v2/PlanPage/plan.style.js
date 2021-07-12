import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	planWrapper: {
		boxSizing: 'border-box',
		marginTop: '2rem',
		padding: '1rem',
		width: '100%',
	},
	plan: {
		background: theme.shadowColor,
		boxSizing: 'border-box',
		borderRadius: 40,
		boxShadow: '19px 19px 38px #c5c5c5,-19px -19px 38px #fbfbfb',
		padding: '1.5rem',
	},
	priceWrapper: {
		height: 150,
		width: 150,
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.shadowColor,
		boxShadow: '19px 19px 38px #c5c5c5,-19px -19px 38px #fbfbfb',

		'& > span': {
			fontSize: '2rem',
			fontWeight: 'bold',
		},
	},
	line: {
		flex: 1,
		width: '100%',
		height: 1,
		background: '#cccccc',
	},
	bulletPoint: {
		height: 10,
		width: 10,
		borderRadius: '50%',
		background: theme.utilColor,
		marginRight: '1rem',
	},
	button: {
		border: 'none',
		padding: '1rem 2rem',
		borderRadius: 20,
		marginRight: '1rem',
		background: theme.shadowColor,
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
	},
}));
export default useStyles;
