import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '500px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	date: {
		fontSize: '0.8rem',
		fontWeight: 600,
	},
	label: {
		color: theme.fontColor,
		fontSize: '0.8rem',
	},
	previousWrapper: {
		maxHeight: '100px',
		width: '100%',
		overflow: 'auto',
		border: '1px solid #bdc3c7',
		padding: '0.4rem',
	},
}));
export default useStyles;
