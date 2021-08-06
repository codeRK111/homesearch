import { CircularProgress, TextField } from '@material-ui/core';

import React from 'react';
import axios from 'axios';
import { updateTowerName } from '../../../utils/asyncProject';

const EditTextField = ({ tower, project, fetchProject, setShowEdit }) => {
	const cancelToken = React.useRef(undefined);
	const [data, setData] = React.useState({
		id: null,
		name: '',
	});
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (tower) {
			console.log(tower);
			setData(tower);
		}
	}, [tower]);

	const onKeyDown = (e) => {
		if (e.key === 'Enter' && data.name) {
			cancelToken.current = axios.CancelToken.source();
			updateTowerName(
				project,
				data._id,
				{
					name: data.name,
				},
				cancelToken.current,
				setLoading
			)
				.then((resp) => {
					setShowEdit(null);
					fetchProject();
				})
				.catch((error) => {
					console.log(error);
					// setAddProjectError(error);
				});
		}
	};
	return (
		<TextField
			fullWidth
			size="small"
			id="filled-basic"
			label="Change Tower Name"
			variant="filled"
			value={data.name}
			onChange={(e) =>
				setData({
					...data,
					name: e.target.value,
				})
			}
			onKeyDown={onKeyDown}
			InputProps={{
				endAdornment: (
					<React.Fragment>
						{loading ? (
							<CircularProgress color="inherit" size={20} />
						) : null}
					</React.Fragment>
				),
			}}
		/>
	);
};

export default EditTextField;
