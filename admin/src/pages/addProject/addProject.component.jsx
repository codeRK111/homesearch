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
import PropertyTab from '../../components/projectWrapper/projectWrapper.component';
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
	const [project, setProject] = React.useState({});
	const [secureAdd, setSecureAdd] = React.useState(false);

	const setProjectState = (state) => {
		setProject((prevState) => ({ ...prevState, ...state }));
		setSecureAdd(true);
	};

	const toggleExpand = (section) => (e) => {
		setExpand((prevState) => ({
			...prevState,
			[section]: !prevState[section],
		}));
	};

	const next = (state) => {
		setExpand((prevState) => ({ ...prevState, projectInfo: false }));
		setProjectInfoCompleted(true);
		setProject((prevState) => ({ ...prevState, ...state }));
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
		// setExpand((prevState) => ({
		// 	...prevState,
		// 	propertyInfo: !prevState.propertyInfo,
		// }));
	};

	const addProject = () => {
		console.log(project);
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
					<Collapse in={expand.propertyInfo} timeout="auto">
						<Box maxWidth mt="1rem">
							<PropertyTab setProject={setProjectState} />
						</Box>
					</Collapse>
					<Box mt="1rem">
						<Button
							color="primary"
							variant="contained"
							onClick={addProject}
							disabled={!secureAdd}
						>
							Add Project
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default AddProject;
