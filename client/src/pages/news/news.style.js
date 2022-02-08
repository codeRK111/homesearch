import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '2rem',
		boxSizing: 'border-box',
	},
	mainNewsWrapper: {
		width: '100%',
		height: 200,
		[theme.breakpoints.up('sm')]: {
			height: '100%',
			width: '100%',
		},

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
		height: 200,
		[theme.breakpoints.up('sm')]: {
			height: '100%',
		},
	},
	headingWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {},
	},
	miniCardMedia: {
		width: '100%',
		height: 200,
		[theme.breakpoints.up('sm')]: {
			width: '100%',
			height: '100%',
		},
	},
}));
export default useStyles;
