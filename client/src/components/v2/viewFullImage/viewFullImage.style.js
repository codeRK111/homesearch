import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	radius: {
		borderRadius: 30,
	},
	imageWrapper: (props) => ({
		height: '80vh',
		boxSizing: 'border-box',
		padding: '1rem',
	}),
}));

export default useStyles;
