import { Box, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import CheckBox from '../formik/checkbox.component';
import React from 'react';

const Legal = ({ initialValues }) => {
	return (
		<div>
			<Formik initialValues={initialValues}>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<Box mt="1rem" mb="0.5rem">
									<b>Legal Clearance</b>
								</Box>
							</Grid>
							{Array.from(Array(20).keys()).map((c) => (
								<Grid item xs={6} md={3} key={c}>
									<CheckBox
										name="legalClearances"
										value={c}
										formLabel={'dummy placeholder'}
									/>
								</Grid>
							))}
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Legal;
