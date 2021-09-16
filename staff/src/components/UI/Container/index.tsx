import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const PageWrapper = withStyles(({ spacing, breakpoints }) => ({
	root: {
		padding: spacing(4),
		[breakpoints.down('sm')]: {
			padding: spacing(1),
		},
	},
}))(Box);
