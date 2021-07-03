import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	gridWrapper: {
		borderRadius: 20,
		background: 'transparent',
		border: '2px solid #cccccc',
		cursor: 'pointer',
		overflow: 'hidden',
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
		height: '30px',
		width: '30px',
		borderRadius: '50%',
		background: theme.utilColor,
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
