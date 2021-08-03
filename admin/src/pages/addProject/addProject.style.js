import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
	},
	chip: {
		fontSize: '1.2rem',
		padding: '0 14px',
	},
	chipRoot: {
		height: '45px',
		borderRadius: '4px',
	},
	imageWrapper: {
		height: '100px',
		width: '100px',
		objectFit: 'contain',
	},
}));
export default useStyles;
