import {
	Box,
	Button,
	CircularProgress,
	Grid,
	TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	addProjectSpeciality,
	getProjectSpecialities,
} from '../../utils/asyncFunctions';

import RowSelect from '../rowSelect/rowSelect.component';
import axios from 'axios';
import useGlobalStyles from '../../common.style';

const SelectSpeciality = ({
	speciality,
	setSpeciality,
	fetchFirst = false,
}) => {
	const gClasses = useGlobalStyles();
	const cancelToken = React.useRef(undefined);
	const [loading, setLoading] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const [name, setName] = useState('');
	const [specialities, setSpecialities] = useState([]);

	const fetchSpecialities = (forRefresh = false) => {
		if (specialities.length === 0 || forRefresh) {
			cancelToken.current = axios.CancelToken.source();
			getProjectSpecialities(cancelToken.current, setLoading, {
				page: 1,
				limit: 200,
				status: 'active',
			})
				.then((resp) => {
					console.log({ resp });
					setSpecialities(resp.specialities);
				})
				.catch((err) => {
					console.log({ err });
				});
		}
	};

	const addSpeciality = () => {
		cancelToken.current = axios.CancelToken.source();
		addProjectSpeciality({ name }, cancelToken.current, setAddLoading)
			.then((resp) => {
				console.log(resp);
				setSpeciality(resp.id);
				setName('');
				fetchSpecialities(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (fetchFirst) {
			fetchSpecialities();
		}
	}, [fetchFirst]);

	const buttonProps = {};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress size={20} />;
	}

	return (
		<Box>
			<RowSelect
				heading="Speciality"
				loading={loading}
				name="speciality"
				value={speciality}
				onChange={(e) => setSpeciality(e.target.value)}
				label="Speciality"
				onOpen={() => fetchSpecialities()}
				menuItems={specialities.map((c) => ({
					label: c.name,
					value: c.id,
				}))}
			/>
			<Box p="0.5rem">
				<Grid container>
					<Grid item xs={12} md={12} lg={4}>
						<Box p="0.3rem">Add speciality if not present</Box>
					</Grid>
					<Grid item xs={12} md={12} lg={8}>
						<Box p="0.3rem">
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<TextField
										size="small"
										id="filled-basic"
										label="Speciality Name"
										variant="filled"
										name="name"
										value={name}
										fullWidth
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</Grid>

								<Grid item xs={12} md={4}>
									<Button
										variant="contained"
										type="button"
										size="large"
										className={gClasses.buttonFullHeight}
										onClick={addSpeciality}
										{...buttonProps}
									>
										Add
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default SelectSpeciality;
