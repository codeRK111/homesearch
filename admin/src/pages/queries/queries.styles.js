import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	addWrapper: {
		width: '500px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	noSpace: {
		margin: 0,
		padding: 0,
	},
}));
export default useStyles;
