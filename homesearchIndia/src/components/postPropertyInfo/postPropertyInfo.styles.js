import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	buttonWrapper: (disable) => ({
		padding: '1rem',
		border: `1px solid ${disable ? theme.fontColorTwo : theme.colorOne}`,
		width: '100%',
		maxWidth: '170px',
		cursor: disable ? undefined : 'pointer',
		borderRadius: 10,

		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem 1rem',
		},
	}),
	icon: {
		marginRight: '0.5rem',
		padding: '0 0.5rem',
		fontSize: '1.5rem',
		borderRight: `1px solid ${theme.fontColor}`,
		color: theme.colorTwo,
	},
	center: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	title: (disable) => ({
		color: disable ? theme.fontColorTwo : theme.fontColor,
		fontSize: '1.3rem',
	}),
	disableIcon: {
		marginRight: '0.5rem',
		padding: '0 0.5rem',
		fontSize: '1.5rem',
		borderRight: `1px solid ${theme.fontColorTwo}`,
		color: theme.fontColorTwo,
	},
	disable: {
		color: theme.fontColorTwo,
	},
	selectedButton: {
		padding: '1rem',
		width: '100%',
		maxWidth: '170px',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		borderRadius: 10,
	},
	fullWidth: {
		width: '100%',
	},
}));
export default useStyles;
