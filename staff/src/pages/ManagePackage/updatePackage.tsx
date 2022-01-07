import { Box, Container } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import { IParam } from '../updateLead';
import Loader from '../../components/Loader';
import { PackageDetails } from '../../model/package.interface';
import UpdatePackageForm from '../../components/Forms/updatePackage';
import { asyncGetPackageDetails } from '../../API/package';

const UpdatePackagePage: React.FC<RouteComponentProps<IParam>> = ({
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<null | PackageDetails>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await asyncGetPackageDetails(id);
			setData(resp);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	}, [id]);

	const onSuccess = () => {
		history.push('/manage-packages');
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	return (
		<Container>
			<Box mt="1rem">
				<Loader open={loading} />
				{data && (
					<UpdatePackageForm data={data} onSuccess={onSuccess} />
				)}
			</Box>
		</Container>
	);
};

export default UpdatePackagePage;
