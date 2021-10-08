import { Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		'&:hover': {
			background: '#c1c1c1',
		},
	},
}));

interface IButtonCard {
	onClick: (value: any) => void;
}
const ButtonCard: React.FC<IButtonCard> = ({ children, onClick }) => {
	const style = useStyles();
	return (
		<Paper className={style.wrapper} onClick={onClick}>
			{children}
		</Paper>
	);
};

export default ButtonCard;
