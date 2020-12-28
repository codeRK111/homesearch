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
			paddingRight: '1rem',
		},
	},
	r5: {
		paddingRight: '5rem',
		[theme.breakpoints.down('sm')]: {
			paddingRight: '1rem',
		},
	},
	gridWrapper: {
		width: '100%',
		marginTop: '2rem',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginTop: 0,
		},
	},
	gridItemWrapper: {
		height: '50px',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '1rem',
		},
	},
	button: {
		border: `1px solid ${theme.colorOne}`,
		cursor: 'pointer',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	center: {
		textAlign: 'center',
	},
	smLeft: {
		paddingLeft: '1rem',
		paddingRight: '1rem',
		[theme.breakpoints.down('sm')]: {
			paddingLeft: 0,
			paddingRight: 0,
		},
	},
	fullWidth: {
		width: '100%',
	},
}));

export default styles;
