import MButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const Button = withStyles({
	label: {
		textTransform: 'none',
	},
})(MButton);
