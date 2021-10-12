import React, { useState } from 'react';

import AddPropertyRent from './Rent';
import AddUserDialog from '../../components/Dialogs/addUser';
import { RouteComponentProps } from 'react-router';
import { SpaceBetween } from '../../components/UI/Flex';
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
				{(() => {
					switch (pType) {
						case 'rent':
							return <AddPropertyRent />;

						default:
							break;
					}
				})()}
			</SpaceBetween>
		</div>
	);
};

export default AddPropertyPage;
