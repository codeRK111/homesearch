import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: theme.spacing(2),
		boxSizing: 'border-box',
	},
	editorWrapper: {
		position: 'relative',
		height: 200,
		boxSizing: 'border-box',
	},
	editor: {
		border: '1px solid #cccccc',
		position: 'relative',
		height: '100%',
		background: 'lightgray',
	},
}));
export default useStyles;
