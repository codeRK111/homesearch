import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPadding}`,
		background: theme.primaryHeadingColor,
		borderRadius: 30,
	},
	flexWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: '#ffffff',
		'&>h1,h3': {
			margin: 0,
			padding: '0.5rem',
		},
		'&>button': {
			marginTop: '2rem',
			padding: '1.2rem 4rem',
			borderRadius: 30,
			border: 'none',
			background: theme.primaryHeadingColor,
			color: '#ffffff',
			boxShadow: '13px 13px 26px #183557,-13px -13px 26px #2c63a1',
			fontWeight: 'bold',
		},
	},
	image: {
		height: '15rem',
	},
	imageWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
}));
export default useStyles;
