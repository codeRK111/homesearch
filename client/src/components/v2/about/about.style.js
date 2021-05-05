import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	text: {
		fontSize: '1.2rem',
		lineHeight: 1.5,
	},
	title: {
		color: theme.secondaryHeadingColor,
	},
}));
export default useStyles;
