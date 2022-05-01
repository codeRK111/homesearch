import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { capitalizeFirstLetter, toHumanReadable } from '../../utils/render';

import AddPackageForm from '../../components/Forms/addPackage';
import EditIcon from '@material-ui/icons/Edit';
import MostPopularSwitch from './popularPackage';
import { PackageDetails } from '../../model/package.interface';
import { StaffType } from '../../model/staff.interface';
import { asyncGetPackages } from '../../API/package';
import { useHistory } from 'react-router-dom';
import { withAccess } from '../../components/HOC/withRole';

const ManagePackagesPage: React.FC = () => {
	const history = useHistory();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [packages, setPackages] = useState<PackageDetails[]>([]);

	const getPackages = useCallback(async () => {
		try {
			const resp = await asyncGetPackages();
			setPackages(resp);
		} catch (error: any) {
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	}, []);

	useEffect(() => {
		getPackages();
	}, [getPackages]);

	return (
		<Container>
			<Box mt="1rem">
				<Typography variant="h5" gutterBottom>
					Manage Packages
				</Typography>
				<AddPackageForm onSuccess={getPackages} />
				<Box mt="2rem">
					<Grid container spacing={3}>
						{packages.map((c) => (
							<Grid key={c.id} item xs={12} md={4}>
								<Paper>
									<Box p="1rem">
										<MostPopularSwitch
											mostPopular={!!c.mostPopular}
											id={c.id}
											onSuccess={getPackages}
										/>
										<Typography gutterBottom>
											Status -{' '}
											<b
												style={{
													color:
														c.status === 'active'
															? 'green'
															: 'red',
												}}
											>
												{c.status}
											</b>
										</Typography>
										<Typography gutterBottom>
											Category Name -{' '}
											<b>
												{c.category
													? capitalizeFirstLetter(
															c.category
													  )
													: '-'}
											</b>
										</Typography>
										<Typography gutterBottom>
											GST Number -{' '}
											<b>{c.gst ? c.gst.number : '-'}</b>
										</Typography>
										<Typography gutterBottom>
											Package Name - <b>{c.name}</b>
										</Typography>
										<Typography gutterBottom>
											Actual Price -{' '}
											<b>
												{toHumanReadable(c.actualPrice)}
											</b>
										</Typography>
										<Typography gutterBottom>
											Sale Price -{' '}
											<b>{toHumanReadable(c.price)}</b>
										</Typography>
										<Typography gutterBottom>
											<b>Package Details:</b>
										</Typography>
										<ul>
											{c.packageDetails.map((b, i) => (
												<li
													style={{
														color:
															b.detailType ===
															'present'
																? 'black'
																: 'red',
													}}
												>
													{b.detail}
												</li>
											))}
										</ul>
										<Button
											variant="contained"
											fullWidth
											startIcon={<EditIcon />}
											onClick={() => {
												history.push(
													`/update-package/${c.id}`
												);
											}}
										>
											Update package
										</Button>
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default withAccess(ManagePackagesPage, [StaffType.Accountant]);
