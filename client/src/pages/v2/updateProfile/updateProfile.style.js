import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	ProfileWrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1rem',
	},
	profileImage: {
		width: 100,
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%',
	},
	inputFile: {
		display: 'none',
	},
}));
export default useStyles;
