import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	error: {
		color: 'red',
		fontWeight: 700,
	},
	chipWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	logo: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
	},
	photo: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
	},
	photoWrapper: {
		width: '100%',
		height: 150,
		position: 'relative',
	},
	cancelWrapper: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'rgba(0,0,0,0.5)',
	},
	cancelIcon: {
		color: '#ffffff',
		fontSize: '2rem',
		cursor: 'pointer',
	},
	input: {
		display: 'none',
	},
	label: {
		display: 'block',
		background: theme.palette.primary.dark,
		width: '100%',
		padding: '1rem 0',
		textAlign: 'center',
		color: theme.palette.primary.contrastText,
		fontWeight: 700,
		fontSize: '1.2rem',
		cursor: 'pointer',
	},
	addWrapper: {
		width: '100%',
		height: 150,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: `1px dotted ${theme.palette.primary.dark}`,
	},
	addDirectorWrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: `1px dotted ${theme.palette.primary.dark}`,
	},
	directorWrapper: {
		width: '100%',
		boxSizing: 'border-box',
	},
	directorImageWrapper: {
		width: '100%',
		height: 150,
		position: 'relative',
	},
	uploadIcon: {
		fontSize: '2rem',
		color: theme.palette.primary.contrastText,
	},
}));
export default useStyles;
