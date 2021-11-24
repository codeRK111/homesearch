import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '2rem',
		boxSizing: 'border-box',
	},
	mainNewsWrapper: {
		height: 500,
		width: '100%',
		display: 'flex',
		alignItems: 'flex-end',
	},
	mediaRoot: {
		boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5 )',
	},
	skeletonWrapperMain: {
		height: 500,
		width: '100%',
	},
	skeletonWrapperSide: {
		height: 150,
		width: '100%',
		// marginTop: '1rem',
	},
	colorWhite: {
		color: '#ffffff',
	},
	fullHeight: {
		height: '100%',
	},
	headingWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {},
	},
}));
export default useStyles;
