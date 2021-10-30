import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import { FetchAdminResponse, StaffType } from '../../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';

import { City } from '../../../model/city.interface';
import { Location } from '../../../model/location.interface';
import { PFacing } from '../../../model/property.interface';
import SearchCity from '../../../components/Search/city';
import SearchLocation from '../../../components/Search/location';
import { asyncFetchAdmins } from '../../../API/auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		[theme.breakpoints.up('sm')]: {
			minHeight: '80vh',
			height: '100%',
			overflow: 'auto',
			boxSizing: 'border-box',
			width: '100%',
		},
	},
}));

interface ISideBar {
	city: any;
	setCity: any;
	pFor: any;
	setPFor: any;
	facing: any;
	setFacing: any;
	location: any;
	setLoaction: any;
	propertyRequirements: Array<string>;
	setPropertyRequirements: any;
	availableFor: any;
	setAvailableFor: any;
	createdBy: any;
	setCreatedBy: any;
}

const SideBar: React.FC<ISideBar> = ({
	city,
	setCity,
	pFor,
	setPFor,
	facing,
	setFacing,
	location,
	setLoaction,
	propertyRequirements,
	setPropertyRequirements,
	availableFor,
	setAvailableFor,
	createdBy,
	setCreatedBy,
}) => {
	const { wrapper } = useStyles();

	// State
	const [bdmLoading, setBdmLoading] = useState(false);
	const [data, setData] = useState<FetchAdminResponse>({
		admins: [],
		totalDocs: 0,
	});

	// Callbacks
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPFor((event.target as HTMLInputElement).value);
	};
	const handleChangeCreatedBy = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCreatedBy((event.target as HTMLInputElement).value);
	};
	const handleChangeFacing = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFacing((event.target as HTMLInputElement).value);
	};

	const fetchAdmins = useCallback(async () => {
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
	}, []);

	const handleChangePropertyRequirement = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			setPropertyRequirements([
				...propertyRequirements,
				event.target.value,
			]);
		} else {
			setPropertyRequirements((prevState: any) =>
				prevState.filter((c: any) => c !== event.target.value)
			);
		}
	};
	const handleChangeAvailableFor = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			setAvailableFor([...availableFor, event.target.value]);
		} else {
			setAvailableFor((prevState: any) =>
				prevState.filter((c: any) => c !== event.target.value)
			);
		}
	};

	useEffect(() => {
		fetchAdmins();
	}, [fetchAdmins]);

	return (
		<Paper className={wrapper}>
			<Box p="1rem">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<SearchCity
							label="Search By City"
							onSelect={(value: City | null) => {
								setCity(value);
							}}
							value={city}
						/>
					</Grid>
					{city && (
						<Grid item xs={12}>
							<SearchLocation
								city={city.id}
								label="Search By Location"
								onSelect={(value: Location | null) => {
									setLoaction(value);
								}}
								value={location}
							/>
						</Grid>
					)}
					<Grid item xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">
								Property For
							</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender1"
								value={pFor}
								onChange={handleChange}
								row
							>
								<FormControlLabel
									value=""
									control={<Radio />}
									label="All"
								/>
								<FormControlLabel
									value="rent"
									control={<Radio />}
									label="Rent"
								/>
								<FormControlLabel
									value="sale"
									control={<Radio />}
									label="Sale"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Facing</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender1"
								value={facing}
								onChange={handleChangeFacing}
								row
							>
								<FormControlLabel
									value={''}
									control={<Radio />}
									label="All"
								/>
								<FormControlLabel
									value={PFacing.East}
									control={<Radio />}
									label="East"
								/>
								<FormControlLabel
									value={PFacing.West}
									control={<Radio />}
									label="West"
								/>
								<FormControlLabel
									value={PFacing.North}
									control={<Radio />}
									label="North"
								/>
								<FormControlLabel
									value={PFacing.South}
									control={<Radio />}
									label="South"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormLabel component="legend">
							Property Requirements
						</FormLabel>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										value={'Flat'}
										checked={propertyRequirements.includes(
											'Flat'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="Flat"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'Duplex'}
										checked={propertyRequirements.includes(
											'Duplex'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="Duplex"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'1RK'}
										checked={propertyRequirements.includes(
											'1RK'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="1RK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'1BHK'}
										checked={propertyRequirements.includes(
											'1BHK'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="1BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'2BHK'}
										checked={propertyRequirements.includes(
											'2BHK'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="2BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'3BHK'}
										checked={propertyRequirements.includes(
											'3BHK'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="3BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'4BHK'}
										checked={propertyRequirements.includes(
											'4BHK'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="4BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'Fully Furnished'}
										checked={propertyRequirements.includes(
											'Fully Furnished'
										)}
										onChange={
											handleChangePropertyRequirement
										}
									/>
								}
								label="Fully Furnished"
							/>
						</FormGroup>
					</Grid>
					{pFor === 'rent' && (
						<Grid item xs={12}>
							<FormLabel component="legend">
								Available For
							</FormLabel>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											value={'Family'}
											checked={availableFor.includes(
												'Family'
											)}
											onChange={handleChangeAvailableFor}
										/>
									}
									label="Family"
								/>
								<FormControlLabel
									control={
										<Checkbox
											value={'Bachelors (Men)'}
											checked={availableFor.includes(
												'Bachelors (Men)'
											)}
											onChange={handleChangeAvailableFor}
										/>
									}
									label="Bachelors (Men)"
								/>
								<FormControlLabel
									control={
										<Checkbox
											value={'Bachelors (Women)'}
											checked={availableFor.includes(
												'Bachelors (Women)'
											)}
											onChange={handleChangeAvailableFor}
										/>
									}
									label="Bachelors (Women)"
								/>
								<FormControlLabel
									control={
										<Checkbox
											value={'Job holder (Men)'}
											checked={availableFor.includes(
												'Job holder (Men)'
											)}
											onChange={handleChangeAvailableFor}
										/>
									}
									label="Job holder (Men)"
								/>
								<FormControlLabel
									control={
										<Checkbox
											value={'Job holder (Women)'}
											checked={availableFor.includes(
												'Job holder (Women)'
											)}
											onChange={handleChangeAvailableFor}
										/>
									}
									label="Job holder (Women)"
								/>
							</FormGroup>
						</Grid>
					)}
					<Grid item xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Posted By</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender1"
								value={createdBy}
								onChange={handleChangeCreatedBy}
							>
								<FormControlLabel
									value=""
									control={<Radio />}
									label="All"
								/>
								{data.admins.map((c) => (
									<FormControlLabel
										value={c.id}
										key={c.id}
										control={<Radio />}
										label={c.name}
									/>
								))}
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default SideBar;
