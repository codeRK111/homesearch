import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	mainImageWrapper: {
		width: '100%',
		// minHeight: '400px',
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%',
		width: '100%',
		height: '100%',
	},
	otherImagesWrapper: {
		display: 'flex',
		// justifyContent: 'space-around',
	},
	imageWrapper: {
		maxWidth: '5rem',
		maxHeight: '5rem',
		cursor: 'pointer',
		position: 'relative',
		marginRight: '1rem',
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		inset: 0,
		backgroundColor: 'rgba(0,0,0,0)',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
	},
	activeImage: {
		border: `4px solid ${theme.colorOne}`,
	},
}));
export default useStyles;
