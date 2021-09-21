import React, { useState } from 'react';

import AddUserDialog from '../../components/Dialogs/addUser';
import { Button } from '../../components/UI/Button';
import { RouteComponentProps } from 'react-router';
import { SpaceBetween } from '../../components/UI/Flex';
import { Typography } from '@material-ui/core';
import useStyles from './addProperty.style';

type Params = {
	pType: string;
};

interface IAddPropertyPage extends RouteComponentProps<Params> {}

const AddPropertyPage: React.FC<IAddPropertyPage> = ({
	match: {
		params: { pType },
	},
}) => {
	const style = useStyles();

	// State
	const [open, setOpen] = useState(false);

	// Callbacks
	const toggleDialog = (status: boolean) => () => {
		setOpen(status);
	};

	return (
		<div className={style.wrapper}>
			<AddUserDialog open={open} handleClose={toggleDialog(false)} />
			<SpaceBetween>
				<Typography variant="h5">Add Property</Typography>
				<Button variant="contained" onClick={toggleDialog(true)}>
					Add User
				</Button>
			</SpaceBetween>
		</div>
	);
};

export default AddPropertyPage;
