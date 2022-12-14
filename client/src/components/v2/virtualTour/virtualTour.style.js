import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		borderRadius: '50px',
		background: theme.shadowColor,
		boxShadow: '23px 23px 33px #acacac,-23px -23px 33px #ffffff',
		padding: `2rem 2rem 2rem ${theme.leftPadding}`,
		[theme.breakpoints.down('sm')]: {
			padding: '1rem',
		},
	},
	image: {
		maxWidth: '100%',
		minWidth: '100%',
		cursor: 'pointer',
	},
	tourHeading: {
		color: theme.secondaryHeadingColor,
		fontSize: '1.3rem',
		fontWeight: 'bold',
		lineHeight: 1.5,
		marginBottom: '3rem',
		[theme.breakpoints.down('sm')]: {
			marginBottom: '1rem',
		},
	},
	link: {
		color: theme.secondaryHeadingColor,
		fontSize: '0.9rem',
		fontWeight: 'bold',
	},
	bottomLink: {
		marginTop: '2rem',
		color: theme.primaryHeadingColor,
	},
}));
export default useStyles;
