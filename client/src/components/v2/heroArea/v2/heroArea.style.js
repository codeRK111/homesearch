import { makeStyles } from '@material-ui/core/styles';
import img from '../../../../assets/hero.svg';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '2rem 1rem 1rem 1rem',
		boxSizing: 'border-box',

		[theme.breakpoints.down('sm')]: {
			padding: '2rem 0',
			minHeight: '65vh',
		},
		[theme.breakpoints.up('sm')]: {
			height: '90vh',
			backgroundImage: `url(${img})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: '100% 40vh',
			backgroundPosition: 'bottom',
		},
	},
	center: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	},
	categoryWrapper: {
		width: 300,
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	categoryButton: {
		border: 'none',
		padding: '0.5rem',
		background: 'transparent',
		fontSize: '1.1rem',
		fontWeight: 'bold',
		color: theme.primaryHeadingColor,
		cursor: 'pointer',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem',
		},
	},
	categorySelectedButton: {
		color: theme.utilColor,
		// borderBottom: `5px solid ${theme.utilColor}`,
		boxShadow: '3px 3px 7px #a4a4a4,-3px -3px 7px #ffffff',
		borderRadius: 10,
	},
	menuParent: {
		position: 'relative',
		marginTop: '1rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem',
			width: '100%',
		},
	},
	menuWrapper: {
		position: 'absolute',
		width: '100%',
		maxHeight: 400,
		overflow: 'auto',
		background: theme.shadowColor,
		boxShadow: '10px 10px 44px #808080,-10px -10px 44px #ffffff',
		borderRadius: 30,
		transition: 'display .3s ease-in-out',
		display: 'none',
	},
	menuWrapperOpen: {
		transition: 'display .3s ease-in-out',
		display: 'block',
		padding: '2rem',
		boxSizing: 'border-box',
	},
	cityWrapper: {
		display: 'flex',
		justifyContent: 'center',
		border: 'none',
		borderRadius: 10,
		padding: '0.5rem 0',
		background: theme.shadowColor,
		boxShadow: '3px 3px 7px #a4a4a4,-3px -3px 7px #ffffff',
		width: '100%',
		fontWeight: 'bold',
		cursor: 'pointer',
		wordBreak: 'break-all',
	},
	propertyTypeWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		border: 'none',
		borderRadius: 10,
		padding: '0.5rem 0',
		background: theme.shadowColor,
		boxShadow: '3px 3px 7px #a4a4a4,-3px -3px 7px #ffffff',
		width: '100%',
		fontWeight: 'bold',
		cursor: 'pointer',
	},
	typeSelected: {
		color: theme.utilColor,
	},
	searchButton: {
		padding: '1rem 2rem',
		border: 'none',
		fontSize: '1.2rem',
		background: theme.yellowColor,
		borderRadius: 15,
		fontWeight: 'bold',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
	},
	citiesWrapper: {
		maxHeight: 200,
		overflow: 'auto',
	},
	iconWraper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		cursor: 'pointer',
	},
	iconText: {
		color: theme.primaryHeadingColor,
		fontWeight: 'bold',
		fontSize: '0.7rem',
		lineHeight: 1.5,
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.7rem',
		},
	},
	citySelected: {
		background: theme.utilColor,
	},
}));
export default useStyles;
