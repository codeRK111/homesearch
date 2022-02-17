import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Typography,
} from '@material-ui/core';

import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';
import React from 'react';
import { StaticPaths } from '../../../utils/render.utils';
import UpdateIcon from '@material-ui/icons/Update';
import useStyles from './builder.style';

const label = {
	upcoming: 'Upcoming',
	ongoing: 'Under construction',
	completed: 'Completed',
};
const icons = {
	upcoming: <UpdateIcon color="primary" />,
	ongoing: <BuildIcon color="secondary" />,
	completed: <CheckCircleIcon color="primary" />,
};

const ProjectCard = ({ project }) => {
	const { complitionStatus, city, title, id, location, thumbnailImage } =
		project;
	const style = useStyles();
	return (
		<Card className={style.cardWrapper}>
			<CardMedia
				image={StaticPaths.project(thumbnailImage)}
				title="Paella dish"
				className={style.image}
			/>
			<CardContent>
				<Typography align="center">
					<Link
						className={style.link}
						to={`/project-details/${id}`}
						target="_blank"
					>
						{title}
					</Link>
				</Typography>
				<Typography align="center" gutterBottom variant="body2">
					{location.name},{city.name}
				</Typography>
				<Box display={'flex'} justifyContent={'center'}>
					<Chip
						icon={icons[complitionStatus]}
						label={label[complitionStatus]}
						variant="outlined"
						size="small"
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ProjectCard;
