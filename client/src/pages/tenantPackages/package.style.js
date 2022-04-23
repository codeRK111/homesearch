import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	packageWrapper: {
		padding: '1rem',
		backgroundColor: 'transparent',
		borderRadius: 20,
		height: '100%',
		boxSizing: 'border-box',

		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	},
	popularPackageWrapper: {
		border: `3px solid ${theme.palette.primary.main}`,
	},
	line: {
		flex: 1,
		width: '100%',
		height: 1,
		background: '#cccccc',
	},
	price: {
		fontSize: '1.3rem',
	},
	specificationWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1rem',
		'& > span': {
			marginLeft: '1rem',
			fontSize: '1rem',
			fontWeight: 600,
			lineHeight: 1.5,
		},
	},
	button: {
		border: `2px solid ${theme.palette.primary.main}`,
		backgroundColor: 'transparent',
		padding: '1rem 2rem',
		fontSize: '1rem',
		textTransform: 'uppercase',
		letterSpacing: 1,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			color: '#ffffff',
		},
	},
	bold: {
		fontWeight: 700,
		letterSpacing: 1,
	},
	lineThrough: {
		textDecoration: 'line-through',
	},
	mostPopular: {
		position: 'absolute',
		padding: '0.5rem 1rem',
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff',
		fontSize: '0.8rem',
		borderRadius: 5,
		left: '50%',
		top: 0,
		transform: 'translate(-50%, -50%)',
	},
	ribbonWrapper: {
		width: 110,
		height: 100,
		overflow: 'hidden',
		position: 'absolute',
		top: -3,
		left: -3,
	},
	ribbon: {
		fontSize: '0.8rem',
		textAlign: 'center',
		padding: '7px 0',
		overflow: 'hidden',
		position: 'relative',
		top: 29,
		left: -60,
		width: 200,
		backgroundColor: theme.yellowColor,
		color: '#000000',
		transform: 'rotate(-45deg)',
	},
}));
