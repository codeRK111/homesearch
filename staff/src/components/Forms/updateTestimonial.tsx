import * as Yup from 'yup';

import {
	CircularProgress,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import FSelect from '../Formik/select';
import FTextField from '../Formik/input';
import { ITestimonial } from '../../model/testimonial';
import RenderByMultipleRole from '../RenderByRole/multiple';
import { StaffType } from '../../model/staff.interface';
import { asyncUpdateTestimonial } from '../../API/testimonial';

export interface IAddLeadStrategyData {
	name: string;
	description: string;
	photo: File | null;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
	testimonial: ITestimonial;
}

interface IStateData extends Omit<ITestimonial, 'photo'> {
	photo: File | string;
}

const UpdateLeadStrategyForm: React.FC<IAddLeadStrategyForm> = ({
	onSuccess,
	testimonial,
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		name: Yup.string().required('URL required'),
		description: Yup.string().required('Description required'),
		photo: Yup.mixed().required('Photo Required'),
	});

	const initialValues: IStateData = {
		...testimonial,
	};

	// State
	const [loading, setLoading] = useState(false);

	const getImageUrl = (img: string | File) => {
		if (typeof img === 'string') {
			return `/assets/testimonial/${img}`;
		} else {
			if (img) {
				return URL.createObjectURL(img);
			}
		}
	};

	// Callbacks
	const onSubmit = async (
		values: IStateData,
		helpers: FormikHelpers<IStateData>
	) => {
		try {
			setLoading(true);
			await asyncUpdateTestimonial(values);
			setLoading(false);
			helpers.resetForm();
			if (onSuccess) {
				onSuccess();
			}
			setSnackbar({
				open: true,
				message: 'Testimonial Updated successfully',
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
				enableReinitialize
			>
				{({ errors, setFieldValue, values }) => (
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
								<img
									src={getImageUrl(values.photo)}
									alt="Poster"
									style={{
										width: '100%',
										height: 200,
										objectFit: 'contain',
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								{errors.photo && (
									<Typography
										color="error"
										variant="caption"
										display="block"
										gutterBottom
									>
										{errors.photo}
									</Typography>
								)}
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
							<RenderByMultipleRole types={[StaffType.GM]}>
								<Grid item xs={12}>
									<FSelect name={'status'} label="Status">
										<MenuItem value={'active'}>
											Active
										</MenuItem>
										<MenuItem value={'inactive'}>
											Inactive
										</MenuItem>
									</FSelect>
								</Grid>
							</RenderByMultipleRole>
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

export default UpdateLeadStrategyForm;
