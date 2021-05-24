import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	text: {
		fontSize: '1.2rem',
		lineHeight: 1.5,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			lineHeight: 1.3,
		},
	},
	title: {
		color: theme.secondaryHeadingColor,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
		},
	},
	appImage: {
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
	},
	storeImage: {
		[theme.breakpoints.down('sm')]: {
			height: 100,
		},
	},
	spacer: {
		marginTop: '5rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '2rem',
		},
	},
}));
export default useStyles;
