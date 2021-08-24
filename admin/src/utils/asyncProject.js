import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

// import queryString from 'query-string';

export const addProject = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				console.log({ error });
				setLoading(false);
				let message = '';
				let validation = false;
				let validationFields = [];
				if (!!error.response) {
					if (error.response.data.validationError) {
						validation = true;
						validationFields = error.response.data.errors;
						message = 'Invalid input fields';
					} else {
						validation = false;
						validationFields = [];
						message = error.response.data.message;
					}
				} else {
					validation = false;
					validationFields = [];
					message = error.message;
				}
				return reject({ message, validation, validationFields });
			});
	});
};
export const addProjectProperty = (project, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project/${project}/units`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.property);
			})
			.catch((error) => {
				console.log({ error });
				setLoading(false);
				let message = '';
				let validation = false;
				let validationFields = [];
				if (!!error.response) {
					if (error.response.data.validationError) {
						validation = true;
						validationFields = error.response.data.errors;
						message = 'Invalid input fields';
					} else {
						validation = false;
						validationFields = [];
						message = error.response.data.message;
					}
				} else {
					validation = false;
					validationFields = [];
					message = error.message;
				}
				return reject({ message, validation, validationFields });
			});
	});
};
export const updateProject = (
	project,
	data,
	cancelToken,
	setLoading,
	type = 'photo'
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url =
			type === 'photo'
				? `/project/upload-photos/${project}`
				: `/project/${project}`;
		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const updateProjectProperty = (id, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/units/${id}`;
		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.property);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const updateTowerNumbers = (project, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/handle-towers/${project}`;

		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const updateTowerName = (
	project,
	tower,
	data,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/handle-tower-name/${project}/${tower}`;

		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const manageTowerFloorPlan = (
	project,
	tower,
	data,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/towers/${tower}/floorPlan/${project}`;

		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const manageTowerStatus = (
	project,
	tower,
	data,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/towers/${tower}/status/${project}`;

		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const removeTower = (projectId, towerId, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/tower/${projectId}/${towerId}`;
		setLoading(true);
		axios
			.delete(apiUrl(url, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const removePhase = (projectId, phaseId, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/phase/${projectId}/${phaseId}`;
		setLoading(true);
		axios
			.delete(apiUrl(url, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const addPhase = (projectId, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/phases/${projectId}`;
		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const addTower = (projectId, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/towers/${projectId}`;
		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const getProject = (project, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/project/${project}`, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve({
					project: resp.data.data.project,
					properties: resp.data.data.properties,
				});
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const copyTower = (
	towerId,
	copyId,
	projectId,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(
				apiUrl(
					`/project/copy-tower/${towerId}/${copyId}/${projectId}`,
					'v2'
				),
				{
					cancelToken: cancelToken.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};

export const removeProjectPhoto = (
	projectId,
	imageId,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading({
			id: imageId,
			loading: true,
			error: null,
		});
		axios
			.get(
				apiUrl(
					`/projects/remove-project-photos/${projectId}/${imageId}`,
					'v1'
				),
				{
					cancelToken: cancelToken.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((resp) => {
				setLoading({
					id: null,
					loading: false,
					error: null,
				});
				return resolve(resp.data.property);
			})
			.catch((error) => {
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setLoading({
					id: null,
					loading: false,
					error: message,
				});
				return reject(message);
			});
	});
};

export const getAddAgentPageData = (cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/page/project/add-agent`, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};

export const searchByCity = (city, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/search-by-city`;
		setLoading(true);
		axios
			.post(
				apiUrl(url, 'v2'),
				{ city },
				{
					cancelToken: cancelToken.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.projects);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};

export const addAgent = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/add-agent`;
		setLoading(true);
		axios
			.post(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.projectAgent);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const getAgentsOfAProject = (id, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/get-agents/${id}`;
		setLoading(true);
		axios
			.get(apiUrl(url, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.projectAgents);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
export const removeAgent = (projectId, agentId, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/remove-agent/${projectId}/${agentId}`;
		setLoading(true);
		axios
			.get(apiUrl(url, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
export const getAllProjects = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/get-projects`;
		setLoading(true);
		axios
			.post(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
