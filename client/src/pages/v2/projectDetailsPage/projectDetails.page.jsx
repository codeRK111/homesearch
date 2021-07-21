import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import LandHeader from '../../../components/v2/searchCard2/project/landDetails.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import Skeleton from '../../../components/v2/skeleton/propertyHeader.component';
import TextSkeleton from '@material-ui/lab/Skeleton';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useStyles from './projectDetailsPage.style';

// import useGlobalStyles from '../../../common.style';

const initialState = {
	project: null,
	properties: [],
	projectInfo: null,
};

const ProjectDetailsPage = ({
	match: {
		params: { id },
	},
	setSnackbar,
}) => {
	const classes = useStyles();
	// const globalClasses = useGlobalStyles();

	// State
	const [data, setData] = useState(initialState);
	// loading State
	const [loading, setLoading] = useState(false);
	// error state
	const [error, setError] = useState(null);

	// Axios cancel token
	let cancelToken = React.useRef();

	// Cancel API call on unmount
	useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	// Fetch Project Info
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				cancelToken.current = axios.CancelToken.source();

				const res = await axios.get(
					apiUrl(`/projects/get-all-details/${id}`),
					{
						cancelToken: cancelToken.current.token,
					}
				);

				const responseData = res.data;
				setData({
					project: responseData.data.project,
					properties: responseData.data.properties,
					projectInfo: responseData.data.projectInfo,
				});
				setLoading(false);
				setError(null);
			} catch (error) {
				setData(initialState);
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setError(message);
			}
		})();
	}, [id]);

	// Throw Error On Screen
	useEffect(() => {
		if (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	}, [error, setSnackbar]);

	const renderHeader = (info) => {
		switch (info.project.projectType) {
			case 'land':
				return <LandHeader project={info.project} />;

			default:
				break;
		}
	};

	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box mb="1rem">
					{loading ? (
						<TextSkeleton width={300} />
					) : (
						data.project && (
							<span>
								Home/ Project/ {data.project.city.name}/{' '}
								{data.project.location.name}
							</span>
						)
					)}
				</Box>
				<Box>
					{loading ? (
						<Skeleton />
					) : (
						data.project && renderHeader(data)
					)}
				</Box>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(null, mapDispatchToProps)(ProjectDetailsPage);
