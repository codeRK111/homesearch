import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	gridWrapper: {
		borderRadius: 30,
		border: '2px solid #cccccc',
		cursor: 'pointer',
		overflow: 'hidden',
		background: theme.shadowColor,
		boxSizing: '8px 8px 16px 0px rgba( 255, 255, 255, 0.2 )',
	},
	selected: {
		border: `4px solid ${theme.utilColor} !important`,
	},
	scrollbar: {
		display: 'flex',
		cursor: 'pointer',
		height: 150,
	},
	scrollbarRight: {
		display: 'flex',
		justifyContent: 'flex-end',
		cursor: 'pointer',
		height: 150,
	},
	scrollWrapper: {
		height: '100%',
		width: '100%',
		borderRadius: 30,
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '2px solid #cccccc',
	},
	sliderWrapper: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		height: '100%',
	},
}));
export default useStyles;
