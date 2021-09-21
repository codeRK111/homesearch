import { Button as MButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const Button = withStyles({
	label: {
		textTransform: 'none',
	},
})(MButton);
