import * as Yup from 'yup';

import { Button, CircularProgress, Grid } from '@material-ui/core';
import {
	ClientRequirementCategory,
	ClientRequirementType,
	ILead,
} from '../../model/lead.interface';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import ClientRequirement from './requirement';
import FTextField from '../../components/Formik/input';
import { IStaff } from '../../model/staff.interface';
import { PageWrapper } from '../../components/UI/Container';
import { Ptype } from '../../model/property.interface';
import Typography from '@material-ui/core/Typography';
import { asyncUpdateLead } from '../../API/lead';
import { useHistory } from 'react-router';

interface IUpdateLeadForm {
	initialValues: ILead;
	id: string;
}

export interface IClientRequirementState {
	requirement: ClientRequirementType;
	category: ClientRequirementCategory;
	pType: Ptype;
	minPrice: string | number;
	maxPrice: string | number;
	action: string;
	holdDate?: Date;
	pickerDate: Date | null;
	bdm: string | IStaff | null;
}

const UpdateLeadForm: React.FC<IUpdateLeadForm> = ({ initialValues, id }) => {
	const history = useHistory();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		name: Yup.string().matches(/^[a-zA-Z ]+$/, 'Invalid Name'),
		email: Yup.string().email('Invalid email'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
	});

	// State
	const [loading, setLoading] = useState(false);
	const [clientRequirement, setRequirement] =
		useState<IClientRequirementState>({
			requirement: initialValues.requirement
				? initialValues.requirement
				: ClientRequirementType.HVP,
			category: initialValues.category
				? initialValues.category
				: ClientRequirementCategory.Sale,
			pType: initialValues.pType ? initialValues.pType : Ptype.Apartment,
			minPrice: initialValues.minPrice ? initialValues.minPrice : '',
			maxPrice: initialValues.maxPrice ? initialValues.maxPrice : '',
			action:
				initialValues.stage === 2
					? 'hold'
					: initialValues.stage === 3
					? 'forward'
					: '',
			pickerDate: initialValues.holdDate
				? initialValues.holdDate
				: new Date(),
			bdm: initialValues.bdm
				? typeof initialValues.bdm === 'string'
					? initialValues.bdm
					: (initialValues.bdm.id as string)
				: '',
		});

	const manageRequirement = (value: ClientRequirementType) => {
		setRequirement((prevState) => ({
			...prevState,
			requirement: value,
		}));
	};
	const manageBDM = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			bdm: value,
		}));
	};
	const manageHoldDate = (value: Date | null) => {
		setRequirement((prevState) => ({
			...prevState,
			pickerDate: value,
		}));
	};
	const manageAction = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			action: value,
		}));
	};
	const manageCategory = (value: ClientRequirementCategory) => {
		setRequirement((prevState) => ({
			...prevState,
			category: value,
		}));
	};
	const managePtype = (value: Ptype) => {
		setRequirement((prevState) => ({
			...prevState,
			pType: value,
		}));
	};
	const manageMinPrice = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			minPrice: value,
		}));
	};
	const manageMaxPrice = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			maxPrice: value,
		}));
	};

	const onSubmit = async (values: ILead, helpers: FormikHelpers<ILead>) => {
		try {
			setLoading(true);
			const input = { ...values, ...clientRequirement };
			if (input.action === 'hold') {
				if (clientRequirement.pickerDate) {
					input.hold = true;
					input.holdDate = clientRequirement.pickerDate;
				}
				if (input.bdm) {
					input.bdm = null;
				}
			} else {
				input.hold = false;
				if (input.holdDate) {
					delete input.holdDate;
				}
			}
			const requiredFields: Array<
				keyof ILead | keyof IClientRequirementState
			> = [
				'action',
				'bdm',
				'category',
				'email',
				'hold',
				'holdDate',
				'maxPrice',
				'minPrice',
				'name',
				'number',
				'pType',
				'requirement',
			];
			const keyss = Object.keys(input) as Array<
				keyof ILead | keyof IClientRequirementState
			>;
			keyss.forEach((c) => {
				if (!requiredFields.includes(c)) {
					delete input[c];
				}
			});
			await asyncUpdateLead(id, input);
			setLoading(false);
			helpers.resetForm();
			setSnackbar({
				open: true,
				message: 'Lead Updated successfully',
				severity: 'success',
			});
			history.push('/leads');
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
			<PageWrapper>
				<Typography variant="h5" gutterBottom>
					Update Lead
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					enableReinitialize
				>
					{() => (
						<Form>
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<FTextField name={'name'} label="Name" />
								</Grid>
								<Grid item xs={12} md={4}>
									<FTextField name={'email'} label="Email" />
								</Grid>
								<Grid item xs={12} md={4}>
									<FTextField
										name={'number'}
										label="Phone Number"
									/>
								</Grid>

								<Grid item xs={12}>
									<ClientRequirement
										setBDM={manageBDM}
										setMax={manageMaxPrice}
										setAction={manageAction}
										setMin={manageMinPrice}
										setRequirement={manageRequirement}
										setCategory={manageCategory}
										setPType={managePtype}
										setHoldDate={manageHoldDate}
										{...clientRequirement}
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
			</PageWrapper>
		</div>
	);
};

export default UpdateLeadForm;
