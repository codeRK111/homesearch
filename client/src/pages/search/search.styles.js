import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
	searchWrapper: {
		paddingTop: '1rem',
		paddingBottom: '3rem',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	searchBoxWrapper: {
		width: '50%',
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		borderRadius: '40px',
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
	resultsWrapper: {
		padding: '1rem 1rem 1rem 0',
		backgroundColor: theme.bgColor,
	},
	input: {
		width: '50%',
		fontSize: '1.3rem',
		border: 'none',
		paddingLeft: '1rem',
		'&:focus': {
			outline: 'none',
		},
	},
	apply: {
		position: 'absolute',
		right: 0,
		top: 0,
		height: '100%',
		width: '100%',
		border: 'none',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
	},
	l5: {
		paddingLeft: '5rem',
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '1rem',
		},
	},
	r5: {
		paddingRight: '5rem',
		[theme.breakpoints.down('sm')]: {
			paddingRight: '1rem',
		},
	},
	gridWrapper: {
		width: '70%',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	gridItemWrapper: {
		[theme.breakpoints.down('sm')]: {
			paddingTop: '1rem',
		},
	},
}));

export default styles;
