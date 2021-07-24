import { Box, Grid } from '@material-ui/core';

import Amenity from '../../../components/v2/amenity/amenity.component';
import React from 'react';
import { capitalizeFirstLetter } from '../../../utils/render.utils';
import useGlobalStyles from '../../../common.style';

const LegalClearance = ({ property, project = false }) => {
	const globalClasses = useGlobalStyles();
	return (
		<>
			{property.for === 'sale' || project ? (
				<>
					{property.legalClearance.filter((c) => c.value).length >
						0 && (
						<Box>
							<h2 className={globalClasses.colorPrimary}>
								Legal Clearance
							</h2>
							<Grid container spacing={1}>
								{property.legalClearance
									.filter((c) => c.value)
									.map((b, i) => {
										return (
											<Grid item xs={6} md={3} key={i}>
												<Amenity
													text={capitalizeFirstLetter(
														b.label
													)}
												/>
											</Grid>
										);
									})}
							</Grid>
						</Box>
					)}
				</>
			) : null}
		</>
	);
};

export default LegalClearance;
