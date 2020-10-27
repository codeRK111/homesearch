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
		marginRight: '1rem',
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
	status: {
		backgroundColor: theme.colorTwo,
		color: '#ffffff',
		padding: '0.3rem',
		borderRadius: '10px',
		fontSize: '0.8rem',
	},
	verified: {
		color: theme.colorTwo,
		fontSize: '1rem',
		marginLeft: '0.5rem',
	},
	info: {
		fontSize: '0.8rem',
		color: theme.fontColor,
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	amenitiesWrapper: {
		fontSize: '0.7rem',
		padding: '0.3rem 0.2rem',
		border: `0.5px solid #cccccc`,
		borderRadius: '5px',
		color: '#cccccc',
	},
	amenitiesWrapperActive: {
		fontSize: '0.7rem',
		padding: '0.3rem 0.2rem',
		border: `0.5px solid #cccccc`,
		borderRadius: '5px',
		color: '#ffffff',
		backgroundColor: theme.colorTwo,
	},
	locationWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			justifyContent: 'flex-start',
		},
	},
}));

export default useStyle;
