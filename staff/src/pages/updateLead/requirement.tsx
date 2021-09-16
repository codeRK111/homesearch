import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function RadioButtonsGroup() {
	const [requirement, setRequirement] = React.useState('hvp');
	const [category, setCategory] = React.useState('');
	const [pType, setPType] = React.useState('');
	const [min, setMin] = React.useState('');
	const [max, setMax] = React.useState('');

	const handleChangeRequirement = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRequirement((event.target as HTMLInputElement).value);
	};
	const handleChangeCategory = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCategory((event.target as HTMLInputElement).value);
	};
	const handleChangePropertyType = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPType((event.target as HTMLInputElement).value);
	};

	return (
		<Box mt="1rem">
			<Box>
				<FormControl component="fieldset">
					<FormLabel component="legend">Requirement</FormLabel>
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
					<FormLabel component="legend">Category</FormLabel>
					<RadioGroup
						row
						aria-label="category"
						name="category"
						value={category}
						onChange={handleChangeCategory}
					>
						<FormControlLabel
							value="sale"
							control={<Radio />}
							label="Sale"
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
					<FormLabel component="legend">Property Type</FormLabel>
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
				<FormControl component="fieldset">
					<FormLabel component="legend">Budget</FormLabel>
				</FormControl>
				<Box display="flex" alignItems="center">
					<TextField
						variant="filled"
						label="MIN"
						value={min}
						onChange={(e) => setMin(e.target.value)}
					/>
					<Typography>--</Typography>
					<TextField
						variant="filled"
						label="MAX"
						value={max}
						onChange={(e) => setMax(e.target.value)}
					/>
				</Box>
			</Box>
		</Box>
	);
}
