import {
	ClientRequirementCategory,
	ClientRequirementType,
} from '../../model/lead.interface';
import { FetchAdminResponse, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { IClientRequirementState } from './form';
import { Ptype } from '../../model/property.interface';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { asyncFetchAdmins } from '../../API/auth';

export interface IClientRequirement extends IClientRequirementState {
	setRequirement: (type: ClientRequirementType) => void;
	setCategory: (cat: ClientRequirementCategory) => void;
	setPType: (pType: Ptype) => void;
	setMin: (value: string) => void;
	setMax: (value: string) => void;
	setHoldDate: (date: Date | null) => void;
	setAction: (action: string) => void;
	setBDM: (bdm: string) => void;
	manageStaffType: (bdm: string) => void;
}

export default function ClientRequirement({
	requirement,
	pickerDate,
	setRequirement,
	category,
	setCategory,
	pType,
	setPType,
	minPrice,
	setMin,
	maxPrice,
	setMax,
	setHoldDate,
	action,
	setAction,
	setBDM,
	bdm,
	manageStaffType,
}: IClientRequirement) {
	const [bdmLoading, setBdmLoading] = useState(false);
	const [data, setData] = useState<FetchAdminResponse>({
		admins: [],
		totalDocs: 0,
	});
	const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAction(event.target.value);
	};
	const handleChangeRequirement = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRequirement(event.target.value as ClientRequirementType);
	};
	const handleChangeCategory = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCategory(event.target.value as ClientRequirementCategory);
	};
	const handleChangePropertyType = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPType(event.target.value as Ptype);
	};

	const fetchAdmins = useCallback(async () => {
		if (action === 'forward') {
			try {
				setBdmLoading(true);
				const resp = await asyncFetchAdmins({
					status: 'active',
					types: [
						StaffType.BDM,
						StaffType.AssistantSalesManager,
						StaffType.SalesExecutive,
					],
				});
				setBdmLoading(false);
				setData(resp);
			} catch (error) {
				setBdmLoading(false);
			}
		}
	}, [action]);

	useEffect(() => {
		fetchAdmins();
	}, [fetchAdmins]);

	return (
		<Box
			mt="1rem"
			display="flex"
			flexDirection={'column'}
			alignItems="center"
		>
			<Box>
				<FormControl component="fieldset">
					<FormLabel component={Typography} align="center">
						Client Type
					</FormLabel>
					<RadioGroup
						row
						aria-label="requirement"
						name="requirement"
						value={requirement}
						onChange={handleChangeRequirement}
					>
						<FormControlLabel
							value="hvp"
							control={<Radio />}
							label="HVP"
						/>
						<FormControlLabel
							value="ndp"
							control={<Radio />}
							label="NDP"
						/>
					</RadioGroup>
				</FormControl>
			</Box>
			<Box mt="1rem">
				<FormControl component="fieldset">
					<FormLabel component={Typography} align="center">
						Requirement Type
					</FormLabel>
					<RadioGroup
						row
						aria-label="category"
						name="category"
						value={category}
						onChange={handleChangeCategory}
					>
						<FormControlLabel
							value={requirement === 'hvp' ? 'sale' : 'buy'}
							control={<Radio />}
							label={requirement === 'hvp' ? 'Sale' : 'Buy'}
						/>
						<FormControlLabel
							value="rent"
							control={<Radio />}
							label="Rent"
						/>
						{requirement === 'hvp' && (
							<FormControlLabel
								value="project"
								control={<Radio />}
								label="Project"
							/>
						)}
					</RadioGroup>
				</FormControl>
			</Box>
			<Box mt="1rem">
				<FormControl component="fieldset">
					<FormLabel component={Typography} align="center">
						Property Type
					</FormLabel>
					<RadioGroup
						row
						aria-label="pType"
						name="pType"
						value={pType}
						onChange={handleChangePropertyType}
					>
						<FormControlLabel
							value="flat"
							control={<Radio />}
							label="Apartment"
						/>
						<FormControlLabel
							value="independenthouse"
							control={<Radio />}
							label="House / Villa"
						/>
						<FormControlLabel
							value="guestHouse"
							control={<Radio />}
							label="Guest House"
						/>
						{category !== 'rent' && (
							<FormControlLabel
								value="land"
								control={<Radio />}
								label="Land"
							/>
						)}
						{category === 'rent' && (
							<>
								<FormControlLabel
									value="hostel"
									control={<Radio />}
									label="Hostel"
								/>
								<FormControlLabel
									value="pg"
									control={<Radio />}
									label="PG"
								/>
							</>
						)}
					</RadioGroup>
				</FormControl>
			</Box>
			<Box mt="1rem" mb="1rem">
				<FormControl component={Typography} align="center">
					<FormLabel component={Typography} align="center">
						Budget
					</FormLabel>
				</FormControl>
				<Box display="flex" alignItems="center">
					<TextField
						type="number"
						inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
						variant="filled"
						label="MIN"
						value={minPrice}
						onChange={(e) => setMin(e.target.value)}
					/>
					<Typography>--</Typography>
					<TextField
						type="number"
						variant="filled"
						inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
						label="MAX"
						value={maxPrice}
						onChange={(e) => setMax(e.target.value)}
					/>
				</Box>
			</Box>
		</Box>
	);
}
