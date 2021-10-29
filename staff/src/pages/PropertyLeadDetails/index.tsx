/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import GoBack from '../../components/GoBack';
import { IParam } from '../updateLead';
import LoadingBackdrop from '../../components/Backdrop';
import { PropertyLead } from '../../model/propertyLead.interface';
import { RouteComponentProps } from 'react-router';
import { StaticPaths } from '../../utils/render';
import { getPropertyLeadDetails } from '../../API/lead';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	image: {
		width: '100%',
		height: 300,
		objectFit: 'cover',
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
	},
}));

const PropertyLeadsDetailsPage: React.FC<RouteComponentProps<IParam>> = ({
	match: {
		params: { id },
	},
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const { image } = useStyles();

	// State
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<null | PropertyLead>(null);

	const fetchDetails = useCallback(async () => {
		try {
			setLoading(true);
			const lead = await getPropertyLeadDetails(id);
			setData(lead);
			setLoading(false);
		} catch (error: any) {
			setData(null);
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	}, [id]);

	useEffect(() => {
		fetchDetails();
	}, [fetchDetails]);

	return (
		<Container>
			<LoadingBackdrop open={loading} />
			<Box mt="2rem">
				<GoBack />
				<Box mt="1rem">
					<Typography variant="h5" gutterBottom>
						Property Images
					</Typography>
					{data && (
						<Grid container spacing={3}>
							{data.photos.map((c, i) => (
								<Grid item xs={12} md={4} key={i}>
									<img
										src={StaticPaths.property(c)}
										alt="Property"
										className={image}
									/>
								</Grid>
							))}
						</Grid>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default PropertyLeadsDetailsPage;
