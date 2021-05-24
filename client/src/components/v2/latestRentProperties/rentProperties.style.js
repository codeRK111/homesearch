import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	listWrapper: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
	},
	propertiesWrapper: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
	},
	scrollbar: {
		display: 'flex',
		flex: 1,
	},
	scrollbarRight: {
		display: 'flex',
		flex: 1,
		justifyContent: 'flex-end',
	},
	content: {
		display: 'flex',
		flex: 12,
	},
	scrollWrapper: {
		height: '75px',
		width: '75px',
		borderRadius: '50%',
		background: theme.shadowColor,
		boxShadow: '7px 7px 14px #bebebe,-7px -7px 14px #ffffff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	chipWrapper: {
		marginRight: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.2rem',
			marginRight: '0.5rem',
		},
	},
}));
export default useStyles;
