import { makeStyles } from '@material-ui/core/styles';
const grayColor = '#535c68';
export const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem 1rem 1rem 1rem',
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '1rem',
			paddingRight: '1rem',
		},
	},
	container: {
		width: '100%',
		height: '100%',
		display: 'grid',
		gap: '20px',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateRows: '35vh 35vh',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '1fr',
			gridTemplateRows: '13vh 13vh 13vh 13vh 13vh 13vh',
			gap: '5px',
		},

		'& > div': {
			fontSize: '2rem',
			position: 'relative',
			borderRadius: '10px',
		},
		'& > div > .absolute': {
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.7)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			color: '#ffffff',
			borderRadius: '20px',
		},
		'& > div > img': {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			borderRadius: '20px',
		},
	},

	horizontal: {
		[theme.breakpoints.up('md')]: {
			gridColumn: 'span 3',
		},
	},
	vertical: {
		[theme.breakpoints.up('md')]: {
			gridRow: 'span 2',
		},
	},
	big: {
		[theme.breakpoints.up('md')]: {
			gridColumn: 'span 2',
			gridRow: 'span 2',
		},
	},
	garyColor: {
		color: grayColor,
	},
	noSpace: {
		padding: '0.2rem 0',
		margin: '0',
	},
	detailsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		width: '100%',
	},
	viewButton: {
		backgroundColor: 'transparent',
		padding: '1rem 2rem',
		color: '#ffffff',
		border: '1px solid #ccc',
		borderRadius: '5px',

		'&:hover': {
			backgroundColor: theme.colorOne,
		},
	},
	contactButton: {
		backgroundColor: theme.colorOne,
		padding: '1.2rem 2.2rem',
		color: '#ffffff',
		border: 'none',
		borderRadius: '5px',
		fontSize: '1.2rem',
		[theme.breakpoints.down('sm')]: {
			padding: '0.8rem 1.8rem',
			fontSize: '1rem',
		},
	},
	textBlock: {
		color: grayColor,
		fontWeight: 500,
		lineHeight: '15px',
	},
	gridContainer: {
		display: 'grid',
		height: '100%',
		gridTemplateColumns: ' repeat( auto-fill, minmax(150px, 1fr) )',
		gap: '1rem',
		gridAutoRows: '1fr',
	},
	gridContainerSmallGap: {
		display: 'grid',
		gridTemplateColumns: ' repeat( auto-fill, minmax(100px, 1fr) )',
		gap: '1rem',
		gridAutoRows: '50px',
	},
	unitImageWrapper: {
		height: '200px',
		padding: '0.5rem',
		borderRadius: '15px',
		overflow: 'hidden',
	},
	unitImage: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: '15px',
		overflow: 'hidden',
	},
	viewDetails: {
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		padding: '0.5rem 1rem',
		border: 'none',
		borderRadius: '5px',
	},
	formWrapper: {
		width: '500px',
		padding: '1rem',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			padding: 0,
		},
	},

	detailsKey: {
		fontSize: '0.8rem',
		wordWrap: 'break-word',
		fontWeight: 500,
	},
	detailsValue: {
		fontSize: '1rem',
		wordWrap: 'break-word',
	},
}));
