import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	link: {
		color: theme.colorTwo,
		textDecoration: 'none',
		fontSize: '0.8rem',
	},
	numberWrapper: {
		fontSize: '0.8rem',
		textAlign: 'center',
	},
	number: {
		color: theme.colorOne,
	},
	label: {
		textAlign: 'center',
		fontSize: '0.9rem',
	},
	avatar: {
		width: '80px',
		height: '80px',
		backgroundColor: '#ffffff',
		padding: '0.2rem',
		boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
		[theme.breakpoints.down('sm')]: {
			width: '40px',
			height: '40px',
		},
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%',
		objectFit: 'contain',
	},
}));
