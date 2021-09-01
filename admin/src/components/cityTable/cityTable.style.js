import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
	flexWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	iconButton: {
		cursor: 'pointer',
	},
	tableWrapper: {
		// overflowX: 'scroll',
	},
	colorRed: {
		color: 'red',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	switchBase: {
		'&$checked': {
			color: theme.palette.common.white,
			'& + $track': {
				backgroundColor: '#52d869',
				opacity: 1,
			},
		},
		'&$focusVisible $thumb': {
			color: '#52d869',
		},
	},
}));

export default useStyles;
