import {
	Button,
	Card,
	CardActions,
	CardHeader,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import { ProjectPhaseTower } from '../../../../model/project.interface';

interface ITowerCard {
	tower: ProjectPhaseTower;
	projectProperties: any[];
}

export const TowerCard: React.FC<ITowerCard> = ({
	tower,
	projectProperties,
}) => {
	const [showEdit, setShowEdit] = useState(false);
	return (
		<Card>
			<CardHeader
				action={
					<IconButton
						aria-label="settings"
						onClick={() => setShowEdit(!showEdit)}
					>
						<EditIcon />
					</IconButton>
				}
				title={showEdit ? <h5>Edit Name</h5> : tower.name}
				subheader={`Tower- ${tower.name}`}
			/>
			<List dense={true}>
				{projectProperties.map((b) => (
					<ListItem key={b}>
						<ListItemText primary={b.title} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="delete"
								size="small"
							>
								<EditIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			<CardActions>
				<Button size="small" color="primary" onClick={() => {}}>
					Add Floor plan
				</Button>
			</CardActions>
		</Card>
	);
};
