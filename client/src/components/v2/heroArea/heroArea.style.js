import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '100%',
		display: 'flex',
		marginTop: '25vh',
		paddingLeft: theme.leftPadding,
		boxSizing: 'border-box',
	},
	iconsContainer: {
		width: '100%',

		marginTop: '5vh',
		// paddingLeft: theme.leftPadding,
		boxSizing: 'border-box',
	},
	searchWrapper: {
		width: '70rem',
		padding: '1rem 2rem',
		background: theme.shadowColor,
		borderRadius: '25px',
		display: 'flex',
		justifyContent: 'space-between',
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
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
			},
		},
	},
	svgWrapper: {
		height: '30px',
		width: '30px',
	},
	whatsappIcon: {
		height: '50px',
		width: '50px',
	},
	iconsWrapper: {
		width: '70rem',
		display: 'flex',
		justifyContent: 'flex-end',
		marginLeft: theme.leftPadding,
		'&>div': {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginLeft: '4rem',
			'&>p': {
				fontSize: '0.8rem',
				fontWeight: 'bold',
			},
		},
	},
	iconShadow: {
		background: theme.shadowColor,
		borderRadius: '50%',
		padding: '1rem',
		boxShadow: '10px 5px 10px #a4a4a4,-10px -10px 20px #ffffff',
		display: 'inline-block',
	},
	whatsappShadow: {
		background: theme.shadowColor,
		borderRadius: '50%',
		boxShadow: '5px 5px 9px #bebebe,-5px -5px 9px #ffffff',
		display: 'inline-block',
		display: 'flex',
	},
	whatsAppWrapper: {
		marginTop: '12vh',
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '4rem',
	},
	tabWrapper: {
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
	},
	tabText: {
		color: theme.primaryHeadingColor,
		fontWeight: 'bold',
		fontSize: '1.2rem',
		cursor: 'pointer',
	},
	mr: {
		marginRight: '2rem',
	},
	selected: {
		color: theme.secondaryHeadingColor,
	},
}));
export default useStyles;
