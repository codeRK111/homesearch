import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
	image: {
		maxWidth: '100%',
		maxHeight: '100%',
		width: '100%',
		height: '100%',
	},
	priceWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.57)',
		color: '#ffffff',
		padding: '0.4rem',
		fontSize: '12px',
		fontWeight: 600,
	},
	companyWrapper: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.77)',
		color: '#ffffff',
		fontWeight: 'bold',
		padding: '0.2rem',
	},
	number: {
		color: theme.colorTwo,
	},
	shortlist: {
		border: `1px solid ${theme.colorTwo}`,
		padding: '0.8rem 2rem',
		color: theme.colorTwo,
		cursor: 'pointer',
		backgroundColor: '#ffffff',
		'&:hover': {
			backgroundColor: theme.colorTwo,
			color: '#ffffff',
		},
	},
	details: {
		border: `1px solid ${theme.colorOne}`,
		padding: '0.8rem 2rem',
		cursor: 'pointer',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
	},
	location: {
		color: theme.fontColor,
	},
	locationIcon: {
		color: theme.colorTwo,
		fontSize: '14px',
	},
	avatar: {
		backgroundColor: theme.colorTwo,
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	title: {
		textAlign: 'center',
	},
	callIcon: {
		fontSize: '1rem',
	},
	imageWrapper: {
		overflow: 'hidden',
	},
	wrapper: {
		backgroundColor: theme.fontColorThree,
		padding: '2rem',
	},
	description: {
		color: theme.fontColor,
		fontSize: '14px',
	},
}));

export default useStyle;
