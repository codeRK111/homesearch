import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import './addQuery.styles.scss';

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

const AddQuery = () => {
	const [currency, setCurrency] = React.useState('EUR');

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};
	return (
		<div>
			<form noValidate autoComplete="off">
				<Paper
					elevation={5}
					classes={{
						root: 'test',
					}}
				>
					<div className="input-wrapper">
						<div className="flex-wrapper">
							<TextField
								style={{
									marginRight: '10px',
								}}
								id="standard-select-currency"
								select
								label="Select user"
								value={currency}
								onChange={handleChange}
								helperText="Please select a user"
							>
								{currencies.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField id="standard-basic" label="Occupation" />
						</div>
						<div className="flex-wrapper">
							<TextField
								id="standard-select-currency"
								select
								style={{
									marginRight: '10px',
								}}
								label="Select purpose"
								value={currency}
								onChange={handleChange}
								helperText="Please select purpose of your query"
							>
								{currencies.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="standard-select-currency"
								select
								label="Select money"
								value={currency}
								onChange={handleChange}
								helperText="Please select type of money"
							>
								{currencies.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>
						<div className="flex-wrapper">
							<TextField
								id="standard-select-currency"
								select
								style={{
									marginRight: '10px',
								}}
								label="Select state"
								value={currency}
								onChange={handleChange}
								helperText="Please select your state"
							>
								{currencies.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="standard-select-currency"
								select
								label="Select city"
								value={currency}
								onChange={handleChange}
								helperText="Please select a state"
							>
								{currencies.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>
						<div className="flex-wrapper">
							<TextField
								id="standard-basic"
								label="Occupation"
								variant="outlined"
								multiline
								rows={4}
								defaultValue="Default Value"
							/>
						</div>
						<div className="button-wrapper">
							<Button
								variant="contained"
								color="primary"
								size="large"
							>
								Add Query
							</Button>
						</div>
					</div>
				</Paper>
			</form>
		</div>
	);
};

export default AddQuery;
