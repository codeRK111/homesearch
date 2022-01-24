import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { asyncSearchLocation } from '../../../../utils/asyncCity';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalStyles from '../../../../common.style';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative',
		display: 'block',
		width: '100%',
		zIndex: 100000,
		'&:hover': {
			'& $dropdownContent': {
				display: 'block',
			},
			// backgroundColor: 'red',
		},
	},
	button: {
		display: 'flex',
		width: '100%',
		padding: '1rem 0',
		border: 'none',
		borderRadius: 20,
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		fontSize: '1rem',
		backgroundColor: theme.shadowColor,
	},
	dropdownContent: {
		display: 'none',
		position: 'absolute',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		backgroundColor: theme.shadowColor,
		borderRadius: 20,
		padding: '1rem',
		height: '50vh',
		overflow: 'auto',
	},
}));

const LocationFilter = ({ city, existingLocations, handleLocations }) => {
	const { wrapper, button, dropdownContent } = useStyles();
	const { bold, colorPrimary, pointer, flexCenter } = useGlobalStyles();

	// State
	const [remoteData, setRemoteData] = useState({
		loading: false,
		data: [],
		error: '',
	});

	const handleChangeCheckbox = (data) => (e) => {
		const { checked } = e.target;
		if (checked) {
			if (existingLocations.length < 3) {
				handleLocations((prevState) => [...prevState, data]);
			}
		} else {
			handleLocations((prevSTate) => prevSTate.filter((c) => c !== data));
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setRemoteData((prevState) => ({
					...prevState,
					loading: true,
					error: '',
				}));
				const resp = await asyncSearchLocation('', city);
				setRemoteData({
					data: resp,
					loading: false,
					error: '',
				});
			} catch (error) {
				setRemoteData({
					data: [],
					loading: false,
					error: error.message,
				});
			}
		})();
	}, [city]);
	return (
		<div className={wrapper}>
			<button
				className={clsx(
					button,
					bold,
					colorPrimary,
					pointer,
					flexCenter
				)}
			>
				Locations
				<ExpandMoreIcon />
			</button>
			<div className={dropdownContent}>
				{remoteData.data.map((c) => (
					<div key={c.id}>
						<FormControlLabel
							control={
								<Checkbox
									checked={Boolean(
										existingLocations.find(
											(b) => b === c.id
										)
									)}
									onChange={handleChangeCheckbox(c.id)}
									size="small"
									color="primary"
								/>
							}
							label={c.name}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default LocationFilter;
