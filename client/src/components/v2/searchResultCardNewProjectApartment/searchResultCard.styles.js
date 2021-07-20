import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
	image: {
		maxWidth: '100%',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	fontAbel: {
		fontFamily: "'Abel', sans-serif",
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
		padding: '1rem 2rem',
		cursor: 'pointer',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		[theme.breakpoints.down('md')]: {
			padding: '0.5rem 1rem',
			fontSize: '80%',
		},
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
	dName: {
		color: theme.fontColor,
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
		alignItems: 'flex-end',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			alignItems: 'flex-start',
		},
	},
	pType: {
		fontSize: '0.7rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0.3rem',
		color: theme.colorOne,
		border: `1px solid ${theme.colorOne}`,
	},
	price: {
		fontWeight: '1000',
		fontSize: '1.2rem',
	},
	point: {
		width: '5px',
		height: '5px',
		borderRadius: '50%',
	},
	iconWrapper: {
		padding: '0.3rem',
		borderRadius: '50%',
		marginLeft: '1rem',
		cursor: 'pointer',
	},
	shareIcon: {
		fontSize: '1.5rem',
		padding: 0,
		color: theme.colorTwo,
	},
	reraWrapper: {
		display: 'flex',
		alignItems: 'center',
		fontSize: '0.8rem',
		padding: '0.1rem',
		backgroundColor: theme.colorTwo,
		color: '#ffffff',
		width: '40px',
	},
	reraIcon: {
		color: '#ffffff',
		fontSize: '0.8rem',
	},
	smallText: {
		fontSize: '0.8rem',
	},
	header: {
		backgroundColor: theme.utilColor,
		color: '#ffffff',
	},
	cell: {
		padding: '0.5rem 0.5rem',
		fontSize: '0.9rem',
	},
	item: {
		borderBottom: '1px solid #cccccc',
	},
	itemWrapper: {
		maxHeight: '100px',
		overflowY: 'auto',
	},
	margin: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem',
		},
	},
	whatsapp: {
		border: `1px solid #cccccc`,
		padding: '0.8rem 0.8rem',
		cursor: 'pointer',
		backgroundColor: '#ffffff',

		[theme.breakpoints.down('md')]: {
			padding: '0.4rem 1rem',
			fontSize: '80%',
		},
	},
	linkTitle: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}));

export default useStyle;
