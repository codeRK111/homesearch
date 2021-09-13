import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	flexWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	perPageWrapper: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		'& > button': {
			padding: '0.5rem 0',
		},
	},
}));
export default useStyles;
