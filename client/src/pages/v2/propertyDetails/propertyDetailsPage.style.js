import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
	},
	filterWrapper: {
		borderRadius: '20px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		padding: '1rem',
	},
	filter: {
		minHeight: '50px',
		borderRight: '2px solid #b9b9b9',
	},
}));
export default useStyles;
