import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	imageWrapper: (props) => ({
		backgroundImage: `url("${props.img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'contain',
		backgroundPosition: 'center',
		height: '80vh',
		width: '100%',
		borderRadius: 30,
		boxSizing: 'border-box',
	}),
}));

export default useStyles;
