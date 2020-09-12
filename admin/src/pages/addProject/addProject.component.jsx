import React from 'react';
import {
	Box,
	Paper,
	Collapse,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Button,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PropertyTab from '../../components/propertyTab/propertyTab.component';
import ProjectInformation from './projectInformation.component';
import './addProject.style.scss';

const initialStateExpand = {
	projectInfo: true,
	propertyInfo: false,
};

const AddProject = () => {
	const [expand, setExpand] = React.useState(initialStateExpand);
	const [projectInfoCompleted, setProjectInfoCompleted] = React.useState(
		false
	);

	const toggleExpand = (section) => (e) => {
		setExpand((prevState) => ({
			...prevState,
			[section]: !prevState[section],
		}));
	};

	const next = () => {
		setExpand((prevState) => ({ ...prevState, projectInfo: false }));
		setProjectInfoCompleted(true);
	};

	React.useEffect(() => {
		if (projectInfoCompleted) {
			setExpand({ propertyInfo: true });
		}
	}, [projectInfoCompleted]);

	const expandPropertyTab = () => {
		if (projectInfoCompleted) {
			setExpand((prevState) => ({
				...prevState,
				propertyInfo: !prevState.propertyInfo,
			}));
		}
	};

	const heading = (name) => <b className="header">{name}</b>;
	return (
		<Box p="1rem">
			<Paper>
				<Box p="1rem">
					<ListItem
						button
						onClick={toggleExpand('projectInfo')}
						classes={{
							root: 'root',
						}}
					>
						<ListItemIcon>
							<ApartmentIcon color="primary" />
						</ListItemIcon>
						<ListItemText
							primary={heading('Project Information')}
						/>
						{expand.projectInfo ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Divider />
					<Collapse in={expand.projectInfo} timeout="auto">
						<ProjectInformation next={next} />
					</Collapse>
					<ListItem
						button
						onClick={expandPropertyTab}
						ContainerComponent="Paper"
					>
						<ListItemIcon>
							<ApartmentIcon color="primary" />
						</ListItemIcon>
						<ListItemText
							primary={heading('Property Information')}
						/>
						{expand.propertyInfo ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse
						in={expand.propertyInfo}
						timeout="auto"
						unmountOnExit
					>
						<Box maxWidth mt="1rem">
							<PropertyTab />
						</Box>
					</Collapse>
					<Box mt="1rem">
						<Button color="primary" variant="contained" disabled>
							Add Project
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default AddProject;
