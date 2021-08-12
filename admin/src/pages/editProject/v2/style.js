import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	floorplanWrapper: {
		display: 'inline-block',
		border: '1px solid #3f51b5',
		padding: '3px 9px',
		textTransform: 'capitalize',
	},
	imageWrapper: {
		height: 75,
		width: '100%',
		objectFit: 'contain',
		margin: '1rem 0',
	},
	cardWrapper: {
		height: '100%',
	},
}));
export default useStyles;
