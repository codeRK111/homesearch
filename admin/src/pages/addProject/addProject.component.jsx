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
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../components/asyncProgressBar/asyncProgressBar.component';
import { selectAddProjectFlatLoading as addProjectFlatLoading } from '../../redux/project/project.selector';
import { addProjectFlat } from '../../redux/project/project.action';
import IndependentHouse from '../../components/projectIndependentHouse/projectIndependentHouse.component';
import ProjectLand from '../../components/projectLand/projectLand.component';

const initialStateExpand = {
	projectInfo: true,
	propertyInfo: false,
};

const AddProject = ({ addProjectFlatLoading, addProjectFlat }) => {
	const history = useHistory();
	const [expand, setExpand] = React.useState(initialStateExpand);
	const [projectInfoCompleted, setProjectInfoCompleted] = React.useState(
		false
	);
	const [project, setProject] = React.useState({});
	const [type, changeType] = React.useState('flat');
	const [secureAdd, setSecureAdd] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

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

	React.useEffect(() => {
		if (addProjectFlatLoading) {
			console.log('test');
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress === 100) {
						return 0;
					}
					const diff = Math.random() * 20;
					return Math.min(oldProgress + diff, 100);
				});
			}, 500);
			return () => {
				clearInterval(timer);
			};
		}
	}, [addProjectFlatLoading]);

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

	const handleAddProjectFlat = (type, data) => {
		if (type === 'success') {
			history.push('/projects/active');
		}
		console.log('type-->', type);
		console.log('data-->', data);
	};

	const addProject = () => {
		console.log(project);
		addProjectFlat(project, handleAddProjectFlat, type);
	};

	const filterRender = (type) => {
		switch (type) {
			case 'flat':
				return <PropertyTab setProject={setProjectState} />;
				break;
			case 'independenthouse':
				return <IndependentHouse setProject={setProjectState} />;
				break;
			case 'land':
				return <ProjectLand setProject={setProjectState} />;
				break;
			default:
				break;
		}
	};

	const heading = (name) => <b className="header">{name}</b>;
	return (
		<Box p="1rem">
			{addProjectFlatLoading && (
				<Box
					color="white"
					position="fixed"
					top={60}
					zIndex="tooltip"
					width="75%"
				>
					<ProgressBar progress={progress} />
				</Box>
			)}
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
						<ProjectInformation
							next={next}
							changeType={changeType}
						/>
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
							{filterRender(type)}
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

const mapStateToProps = createStructuredSelector({
	addProjectFlatLoading,
});

const mapDispatchToProps = (dispatch) => ({
	addProjectFlat: (project, callback, type) =>
		dispatch(addProjectFlat({ project, callback, type })),
});

AddProject.propTypes = {
	addProjectFlatLoading: PropTypes.bool,
	addProjectFlat: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
