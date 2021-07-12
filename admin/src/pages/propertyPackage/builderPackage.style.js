import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	pageWrapper: {
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
		},
	},
	addPackageWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		'&>div': {
			width: 500,
			padding: '0.5rem',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
	},
	editWrapper: {
		width: 500,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
}));
export default useStyles;
