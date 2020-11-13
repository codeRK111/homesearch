import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '60vw',
		padding: '1rem',
		color: theme.fontColor,
		[theme.breakpoints.down('sm')]: {
			width: '90vw',
		},
	},
	avatar: {
		width: '10rem',
		height: 'auto',
	},
	title: {
		fontSize: '1.5rem',
	},
	cGreen: {
		color: theme.colorTwo,
	},
	cBlack: {
		color: '#000000',
	},
	icon: {
		fontSize: '1rem',
	},
	button: {
		textTransform: 'none',
		marginLeft: '2rem',
	},
	buttonUpload: {
		textTransform: 'none',
	},
	input: {
		display: 'none',
	},
}));
export default useStyles;
