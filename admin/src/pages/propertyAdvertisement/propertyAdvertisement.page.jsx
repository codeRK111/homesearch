import { Box, Button, Grid } from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import Table from '../../components/propertyManagementTable/propertyManagementTable.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchProjectAdvertisements } from '../../redux/kra/kra.actions';
import { selectfetchProjectAdvertisementsLoading } from '../../redux/kra/kra.selector';
import { useHistory } from 'react-router-dom';

const ProjectAdvertisement = ({ loading, fetchProjectAdvertisements }) => {
	const history = useHistory();
	const [asyncError, setAsyncError] = React.useState(null);
	const [advertisements, setAdvertisements] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [count, setCount] = React.useState(1);

	const handleChange = (event, value) => {
		setPage(value);
	};

	React.useEffect(() => {
		const callback = (status, data) => {
			if (status === 'success') {
				setAsyncError(null);
				setAdvertisements(data.projectAdvertisements);
				setCount(data.count);
			} else {
				setAsyncError(null);
				setAdvertisements([]);
				setPage(null);
				setCount(null);
			}
		};
		fetchProjectAdvertisements(page, callback);
	}, [fetchProjectAdvertisements, page]);

	const onAddStaff = (_) => {
		history.push('/property-advertisement/add');
	};
	return (
		<Box p="1rem">
			<Grid container spacing={2}>
				<Grid item xs={12} md={10}>
					<h3>Property Advertisement</h3>
				</Grid>
				<Grid item xs={12} md={2}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddCircleOutlineIcon />}
						onClick={onAddStaff}
					>
						Add Staff
					</Button>
				</Grid>
			</Grid>
			<p className="color-red">{asyncError}</p>
			<Table advertisements={advertisements} loading={loading} />
			{!loading && (
				<Box mt="1rem" display="flex" justifyContent="center">
					<Pagination
						count={Math.ceil(count / 10)}
						page={page}
						onChange={handleChange}
						color="primary"
					/>
				</Box>
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectfetchProjectAdvertisementsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProjectAdvertisements: (page, callback) =>
		dispatch(
			fetchProjectAdvertisements({ page, callback, pType: 'property' })
		),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectAdvertisement);
