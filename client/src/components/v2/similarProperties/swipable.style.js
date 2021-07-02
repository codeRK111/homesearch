import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	gridWrapper: {
		borderRadius: 10,
		background: theme.shadowColor,
		border: '2px solid #cccccc',
		cursor: 'pointer',
	},
	selected: {
		border: `4px solid ${theme.utilColor} !important`,
	},
	scrollbar: {
		display: 'flex',
		cursor: 'pointer',
	},
	scrollbarRight: {
		display: 'flex',
		justifyContent: 'flex-end',
		cursor: 'pointer',
	},
	scrollWrapper: {
		height: '75px',
		width: '75px',
		borderRadius: '50%',
		background: theme.shadowColor,
		boxShadow: '7px 7px 14px #bebebe,-7px -7px 14px #ffffff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sliderWrapper: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
	},
}));
export default useStyles;
