import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: '#ffffff',

		'& img': {
			width: 75,
			height: 75,
			[theme.breakpoints.up('sm')]: {
				width: 200,
				height: 200,
			},
		},
	},
}));
export default useStyles;
