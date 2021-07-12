import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: theme.shadowColor,
		position: 'relative',
		width: '100%',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '1rem',
		cursor: 'pointer',
		boxSizing: 'border-box',

		[theme.breakpoints.down('sm')]: {
			fontSize: '0.7rem',
			minWidth: '50px',
			borderRadius: '15px',
			boxShadow: '7px 7px 15px #acacac,-7px -7px 15px #ffffff',
		},
	},
	wrapperFullWidth: {
		background: theme.shadowColor,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		height: 35,
		width: '100%',
		cursor: 'pointer',
		fontSize: '0.8rem',
		'&>span': {
			fontWeight: '600',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.7rem',
			width: '100%',
			borderRadius: '15px',
			boxShadow: '7px 7px 15px #acacac,-7px -7px 15px #ffffff',
		},
	},
	selected: {
		border: `4px solid ${theme.utilColor}`,
		// background: theme.utilColor,
	},
	containerWrapper: {
		/* Displayed at the top left corner */
		right: '0px',
		position: 'absolute',
		top: '0px',

		/* Size */
		height: '100px',
		width: '100px',

		/* Hide the part of its children which is displayed outside */
		overflow: 'hidden',
	},

	containerRibbon: {
		/* Position */
		right: '-72px',
		position: 'absolute',
		top: '25px',

		/* Size */
		height: '24px',
		width: '206px',

		/* Displayed diagonally */
		transform: 'rotate(45deg)',

		/* Background color */
		backgroundColor: theme.utilColor,

		/* Centerize the text content */
		textAlign: 'center',
		fontSize: '0.8rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));
export default useStyles;
