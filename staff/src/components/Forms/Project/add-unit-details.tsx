import { Box, Container, Grid } from '@material-ui/core';

import { AddProjectTower } from './unit-config/add-tower';
import { Project } from '../../../model/project.interface';
import React from 'react';
import { TowerCard } from './unit-config/tower';

interface IAddProjectUnitDetailsForm {
	projectId: null | string;
	project: null | Project;
	projectProperties: any[];
	fetchProjectDetails: () => void;
}

const jsonData = {
	amenities: [
		'5f3e738c71cdccd063dd1c3a',
		'5f3e734b71cdccd063dd1c36',
		'5f3e72a171cdccd063dd1c32',
		'5f3e724971cdccd063dd1c2e',
		'5f3e720671cdccd063dd1c2a',
	],
	virtualTours: ['https://www.youtube.com/watch?v=40vM21ZszT0'],
	thumbnailImage: '1651839568010.png',
	masterFloorPlan: '1651839568037.png',
	geogrophicalImage: '1651839568040.png',
	status: 'active',
	_id: '6275124f0d253930284ba4f9',
	projectType: 'flat',
	title: 'Test Builder',
	builder: {
		phoneNumber: '9853325956',
		cities: [
			{
				image: null,
				top: false,
				status: 'active',
				_id: '5f4515639a93b9a7f42b93b6',
				name: 'Anugul',
				state: 'Odisha',
				__v: 0,
				id: '5f4515639a93b9a7f42b93b6',
			},
			{
				image: null,
				top: false,
				status: 'active',
				_id: '5f2cf831ab6d0b12da11427f',
				name: 'Balangir',
				state: 'Odisha',
				id: '5f2cf831ab6d0b12da11427f',
			},
		],
		logo: '22495872-logo.png',
		_id: '605b01c250efde2da0161207',
		developerName: 'BK Builders',
		slug: 'bk-builders',
		id: '605b01c250efde2da0161207',
	},
	complitionStatus: 'ongoing',
	description: 'Test',
	usp: 'Near NH',
	bookingAmount: 2000000,
	emi: 55000,
	totalLandArea: 5,
	city: {
		_id: '5f2cf831ab6d0b12da114161',
		name: 'Bhubaneswar',
		id: '5f2cf831ab6d0b12da114161',
	},
	location: {
		_id: '5f4667f2f1998651d7854d08',
		name: 'Patia',
		city: {
			image: null,
			top: true,
			status: 'active',
			_id: '5f2cf831ab6d0b12da114161',
			name: 'Bhubaneswar',
			state: 'Odisha',
			id: '5f2cf831ab6d0b12da114161',
		},
		id: '5f4667f2f1998651d7854d08',
	},
	lunchingDate: '2022-05-06T11:16:15.964Z',
	photos: [
		{
			default: false,
			_id: '627512500d253930284ba4fa',
			image: '1651839568044.png',
		},
		{
			default: false,
			_id: '627512500d253930284ba4fb',
			image: '1651839568057.png',
		},
		{
			default: false,
			_id: '627512500d253930284ba4fc',
			image: '1651839568061.png',
		},
		{
			default: false,
			_id: '627512500d253930284ba4fd',
			image: '1651839568063.png',
		},
		{
			default: false,
			_id: '627512500d253930284ba4fe',
			image: '1651839568072.png',
		},
		{
			default: false,
			_id: '627512500d253930284ba4ff',
			image: '1651839568094.png',
		},
	],
	legalClearance: [],
	phases: [],
	towerNames: [],
	createdAt: '2022-05-06T12:19:27.453Z',
	updatedAt: '2022-05-06T12:19:28.600Z',
	slug: 'test-builder',
	__v: 0,
	docNumber: 9,
	id: '6275124f0d253930284ba4f9',
};

export const AddProjectUnitDetailsForm: React.FC<
	IAddProjectUnitDetailsForm
> = ({ project, fetchProjectDetails, projectId, projectProperties }) => {
	return (
		<Container>
			<Box p={'1rem'}>
				{/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
				<AddProjectTower
					id={projectId}
					fetchProjectDetails={fetchProjectDetails}
					project={project}
				/>
			</Box>
			{project && (
				<Box mt={'1rem'}>
					<Grid container spacing={3}>
						{project.towerNames.map((c) => (
							<Grid item xs={12} md={4} key={c._id}>
								<TowerCard
									tower={c}
									projectProperties={projectProperties.filter(
										(b) => b.tower._id === c._id
									)}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Container>
	);
};
