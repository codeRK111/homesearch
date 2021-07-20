import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '1rem',
		boxSizing: 'border-box',
		borderRadius: '40px',
		backgroundColor: theme.shadowColor,
		boxShadow: '30px 10px 30px 0 #a6a6a6, -30px -30px 30px 0 #ffffff',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logoWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	logoTitle: {
		color: theme.primaryHeadingColor,
		fontWeight: 700,
		marginLeft: '0.5rem',
		'&>span': {
			color: theme.secondaryHeadingColor,
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
	logo: {
		height: '25px',
	},
	listButton: {
		color: theme.secondaryHeadingColor,
		fontWeight: 700,
		padding: '0.5rem 1rem',
		backgroundColor: theme.shadowColor,
		boxShadow: '5px 5px 9px #a8a8a8, -5px -5px 9px #ffffff',
		borderRadius: '20px',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.secondaryHeadingColor,
			color: '#ffffff',
		},
	},
	profileWrapper: {
		backgroundColor: theme.shadowColor,
		display: 'flex',
		boxShadow: '5px 5px 9px #a8a8a8, -5px -5px 9px #ffffff',
		borderRadius: '10px',
		marginLeft: '1rem',
		padding: '0.2rem',
		'&>img': {
			height: '30px',
		},
	},
	rightSide: {
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	searchWrapper: {
		borderRadius: 40,
		background: theme.shadowColor,
		minHeight: 50,
		width: 500,
		boxShadow: 'inset 7px 7px 14px #bababa,inset -7px -7px 14px #ffffff',
		display: 'flex',
		alignItems: 'center',
		'&>input': {
			border: 'none',
			width: '100%',
			background: 'transparent',

			'&:focus': {
				outline: 'none',
			},
			'&::placeholder': {
				color: theme.primaryHeadingColor,
				fontWeight: 700,
				[theme.breakpoints.down('sm')]: {
					fontSize: '0.6rem',
				},
			},
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			padding: '1rem',
		},
	},
	selectedLocation: {
		padding: '0.5rem 1rem',
		display: 'flex',
		alignItems: 'center',
		background: '#FFD609',
		borderRadius: 20,

		'& span': {
			fontWeight: 'bold',
			fontSize: '0.8rem',
		},
	},
	searchLogo: {
		height: 25,
	},
	menuIcon: {
		width: 30,
		[theme.breakpoints.down('sm')]: {
			width: 25,
		},
	},

	selected: {
		backgroundColor: theme.utilColor,
		padding: '0.3rem 0.8rem',
		color: '#ffffff',
		borderRadius: 20,
	},
	cityWrapper: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		padding: '0.5rem',
		margin: '1rem',
		background: '#e3e3e3',
		boxShadow: '6px 6px 12px #bfbfbf,-6px -6px 12px #ffffff',
		borderRadius: 10,
	},
	menuWrapper: {
		width: '30rem',
		height: 200,
		overflow: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '70vw',
		},
	},
	searchButton: {
		background: theme.shadowColor,
		padding: '0.5rem',
		boxShadow: '10px 5px 10px #a4a4a4,-10px -10px 20px #ffffff',
		display: 'inline-block',
		cursor: 'pointer',
		borderRadius: 10,
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
		},
		'&>img': {
			height: '1.2rem',
			width: 'auto',
		},
	},
	smMenu: {
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'inline-block',
		},
	},
}));
export default useStyles;
