import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: `2rem 2rem 2rem ${theme.leftPaddingMedium}`,
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: '1rem',
		},
	},
	filterWrapper: {
		borderRadius: '20px',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		padding: '1rem',
	},
	filter: {
		minHeight: '50px',
		borderRight: '2px solid #b9b9b9',
	},
	mapWrapper: {
		width: '100%',
		height: 400,
		borderRadius: 20,
		border: '1px solid black',
		marginTop: '2rem',
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
	content: {
		display: 'flex',
		flex: 12,
		padding: '0 1rem',
	},
	likeIcon: {
		height: '1rem',
	},
	likeValue: {
		fontSize: '0.8rem',
	},
	divider: {
		height: 3,
		width: '100%',
		background: '#c1c1c1',
		borderRadius: 1,
		margin: '2rem 0',
	},
	utilsWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 300,
		padding: '1rem',
		background: theme.shadowColor,
		boxShadow: '9px 9px 18px #9f9f9f, -9px -9px 18px #ffffff',
		borderRadius: 30,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			boxSizing: 'border-box',
		},
	},
	utilsIcon: {
		height: '2rem',
	},
	comment: {
		width: '100%',
		background: theme.shadowColor,
		border: 'none',
		minHeight: 100,
		boxShadow: 'inset 3px 3px 5px #b5b5b5,inset -3px -3px 5px #ffffff',
		borderRadius: 20,
		fontSize: '1rem',
		padding: '1rem 1rem 1rem 2rem',
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			padding: '0.5rem',
			borderRadius: 20,
			boxShadow:
				'inset 6px 6px 11px #b3b3b3,inset -6px -6px 11px #ffffff',
		},
		'&:focus': {
			outline: 'none',
		},
		'&::placeholder': {
			color: theme.primaryHeadingColor,
			fontWeight: 700,
			fontSize: '1.5rem',
			[theme.breakpoints.down('sm')]: {
				fontWeight: 600,
				fontSize: '1rem',
			},
		},
	},
	commentWrapper: {
		display: 'flex',
		boxSizing: 'border-box',
		'& p': {
			paddingLeft: '1rem',
			fontSize: '0.8rem',
			maxWidth: 400,
		},
	},

	avatar: {
		height: '60px',
		width: '60px',
		position: 'absolute',
	},

	rightWrapper: {
		background: theme.shadowColor,
		borderRadius: 50,
		boxShadow: '20px 20px 40px #969696,-20px -20px 40px #ffffff',
		padding: '1rem',
		// position: 'fixed',
	},

	ownerId: {
		fontWeight: 600,
		textTransform: 'uppercase',
		color: '#c1c1c1',
	},
	avatarWrapper: {
		position: 'relative',
		height: '50px',
		width: '65px',
		display: 'inline-block',
		marginRight: '1rem',
	},
	commentIcon: {
		position: 'absolute',
		height: 20,
		width: 20,

		borderRadius: '50%',
		background: '#FA9B0B',
		fontSize: '1.5rem',
		fontWeight: 'bolder',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		right: 0,
		bottom: 0,
	},
	shareIcon: {
		color: theme.primaryHeadingColor,
		fontSize: '2rem',
	},
	button: {
		cursor: 'pointer',
		background: theme.shadowColor,
		display: 'flex',
		minWidth: '75px',
		justifyContent: 'center',
		borderRadius: '20px',
		boxShadow: '10px 10px 20px #acacac,-10px -10px 20px #ffffff',
		padding: '1rem 3rem',
		border: 'none',
	},
}));
export const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.shadowColor,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[3],
		fontSize: 11,
	},
}))(Tooltip);
export default useStyles;
