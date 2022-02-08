import * as Yup from 'yup';

import { CircularProgress, Grid } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import FTextField from '../Formik/input';
import { asyncAddTestimonial } from '../../API/testimonial';

export interface IAddTestimonialData {
	name: string;
	description: string;
	photo: File | null;
}

interface IAddTestimonialForm {
	onSuccess?: () => void;
}

const AddTestimonialForm: React.FC<IAddTestimonialForm> = ({ onSuccess }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		name: Yup.string().required('Name required'),
		description: Yup.string().required('Description required'),
	});

	const initialValues: IAddTestimonialData = {
		name: '',
		description: '',
		photo: null,
	};

	// State
	const [loading, setLoading] = useState(false);

	// Callbacks
	const onSubmit = async (
		values: IAddTestimonialData,
		helpers: FormikHelpers<IAddTestimonialData>
	) => {
		try {
			setLoading(true);
			await asyncAddTestimonial(values);
			setLoading(false);
			helpers.resetForm();
			if (onSuccess) {
				onSuccess();
			}
			setSnackbar({
				open: true,
				message: 'Testimonial Posted successfully',
				severity: 'success',
			});
		} catch (err: any) {
			console.log(err);
			setLoading(false);
			setSnackbar({
				open: true,
				message: err.message,
				severity: 'error',
			});
		}
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ errors, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FTextField name={'name'} label="Name" />
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'description'}
									label="Description"
									rows={5}
									multiline
								/>
							</Grid>

							<Grid item xs={12}>
								<input
									type="file"
									onChange={(e) => {
										if (e.target.files) {
											setFieldValue(
												'photo',
												e.target.files[0]
											);
										}
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<Button
									variant={'contained'}
									color={'primary'}
									size={'large'}
									type={'submit'}
									disabled={loading}
									endIcon={
										loading ? (
											<CircularProgress
												size={20}
												color={'inherit'}
											/>
										) : (
											<></>
										)
									}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AddTestimonialForm;
