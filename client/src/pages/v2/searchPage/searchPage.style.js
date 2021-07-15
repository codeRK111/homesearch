import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `1rem 1rem 1rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
	},
	filterWrapper: {
		borderRadius: '20px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		// padding: '1rem',
	},
	filter: {
		minHeight: '50px',
		borderRight: '2px solid #b9b9b9',
	},
	pagination: {
		backgroundColor: theme.shadowColor,
	},
	locationWrapper: {
		height: 300,
		overflow: 'auto',
		padding: '1rem',
	},
	filterParent: {
		marginBottom: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 0,
		},
	},
	mobileFilterWrapper: {
		width: '80vw',
		padding: '1rem',
		boxSizing: 'border-box',
	},
	checked: {
		color: `${theme.utilColor} !important`,
	},
}));
export default useStyles;
