import { Box, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import AddPropertyLeadForm from '../../components/Forms/addPropertyLead';
import LoadingBackdrop from '../../components/Backdrop';
import { StaffType } from '../../model/staff.interface';
import UploadLeadImage from './uploadImage';
import { withAccess } from '../../components/HOC/withRole';

const AddPropertyLeadPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [lat, setLat] = useState<null | number>(null);
	const [id, setId] = useState<null | string>();
	const [fetchGeoLocation, setFetchGeoLocation] = useState(false);
	const [lng, setLng] = useState<null | number>(null);
	const [showForm, setShowForm] = useState(false);

	const onSuccess = (id: string) => {
		setId(id);
	};

	const renderChild = (): JSX.Element => {
		if (showForm) {
			if (id) {
				return <UploadLeadImage id={id} />;
			} else {
				return (
					<AddPropertyLeadForm
						lat={lat}
						lng={lng}
						onSuccess={onSuccess}
					/>
				);
			}
		} else {
			return <></>;
		}
	};

	const getLocation = useCallback(() => {
		setFetchGeoLocation(true);
		if (!navigator.geolocation) {
			setSnackbar({
				open: true,
				message: 'Unable to fetch location',
				severity: 'error',
			});
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setShowForm(true);
					setFetchGeoLocation(false);
					setLat(position.coords.latitude);
					setLng(position.coords.longitude);
				},
				() => {
					setFetchGeoLocation(false);
					setShowForm(false);
					setSnackbar({
						open: true,
						message: 'Unable to fetch location',
						severity: 'error',
					});
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getLocation();
	}, [getLocation]);
	useEffect(() => {
		setId('');
	}, []);

	return (
		<Container>
			<LoadingBackdrop open={fetchGeoLocation} />
			<Box mt="2rem">
				<Typography variant="h5" gutterBottom>
					Add Property
				</Typography>
				<Typography variant="caption" display="block" gutterBottom>
					* Please post at the exact location of property
				</Typography>
				{renderChild()}
			</Box>
		</Container>
	);
};

export default withAccess(AddPropertyLeadPage, [
	StaffType.GM,
	StaffType.AssistantSalesManager,
	StaffType.SalesExecutive,
]);
