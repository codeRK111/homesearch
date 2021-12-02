import {
	Box,
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { parseDate, toCurrency } from '../../utils/render.utils';

import DatePicker from '../../components/formik/datePickerCustom.component';
import ErrorCard from '../../components/v2/backdropMessage';
import LoaderBackdrop from '../../components/LoaderBackdrop';
import Nav from '../../components/v2/pageNav/nav.component';
import { asyncGetProposalDetails } from '../../utils/asyncPackage';
import useStyles from './proposal.style';

const ManageProposal = ({
	match: {
		params: { id },
	},
}) => {
	const style = useStyles();
	const [proposalStatus, setProposalStatus] = useState('accepted');
	const [fetchLoading, setFetchLoading] = useState(false);
	const [data, setData] = useState(null);
	const [fetchError, setFetchError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [visitDate, setVisitDate] = useState(new Date());

	const handleChange = (event) => {
		setProposalStatus(event.target.value);
	};

	const fetchProposal = useCallback(async () => {
		try {
			setFetchLoading(true);
			const resp = await asyncGetProposalDetails(id);
			setData(resp);
			setFetchLoading(false);
			setFetchError(null);
		} catch (error) {
			setFetchLoading(false);
			setFetchError(error);
			setData(null);
		}
	}, [id]);

	useEffect(() => {
		fetchProposal();
	}, [fetchProposal]);

	return (
		<>
			<Nav />
			<Container>
				{!!fetchError && <ErrorCard message={fetchError} />}
				<LoaderBackdrop open={fetchLoading} />
				<Box mt="2rem">
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<Typography variant="h6" gutterBottom>
								<b>From</b>
							</Typography>
							<Typography gutterBottom>
								<b>Grovis Technologies Pvt. Ltd</b>
							</Typography>
							<Typography gutterBottom>
								<b>Registered Office:</b>
							</Typography>
							<Typography gutterBottom>
								#363,19th Main Road,1st Block
								Rajajinagar,Banglore-560010
							</Typography>
							<Typography gutterBottom>
								<b>Eastern and Central Zone office:</b>
							</Typography>
							<Typography gutterBottom>
								2nd, Floor, JSS STP Tower 1, Infocity, Patia,
								Bhubbaneswar, 751024, Odisha, India
							</Typography>
							<Typography gutterBottom>
								<b>PAN</b> - AAICG873C
							</Typography>
							<Typography gutterBottom>
								<b>TAN</b> - BLRG25733B
							</Typography>
						</Grid>
						{data && (
							<Grid item xs={12} md={4}>
								<Typography variant="h6" gutterBottom>
									<b>To</b>
								</Typography>
								<Typography gutterBottom>
									<b>{data.name}</b>
								</Typography>
								<Typography gutterBottom>
									{data.email}
								</Typography>
								<Typography gutterBottom>
									{data.number}
								</Typography>
							</Grid>
						)}
						{data && (
							<Grid item xs={12} md={4}>
								<Typography variant="h6" gutterBottom>
									<b>Package Details</b>
								</Typography>
								<Typography gutterBottom>
									<b>Rs {toCurrency(data.proposalPrice)}</b>
								</Typography>
								<Typography gutterBottom>
									Interested In :{' '}
									{data.propertyRequirements.map((c, i) => (
										<b>{`${c}${
											i + 1 <
											data.propertyRequirements.length
												? ','
												: ''
										}`}</b>
									))}
								</Typography>
								<Typography gutterBottom>
									City: <b>{data.city.name}</b>
								</Typography>
								<Typography gutterBottom>
									Prefered Location:{' '}
									<b>{data.preferedLocation}</b>
								</Typography>
								<Typography gutterBottom>
									Price Range:{' '}
									<b>
										Rs. {toCurrency(data.minPrice)} to
										{toCurrency(data.maxPrice)}
									</b>
								</Typography>
							</Grid>
						)}
					</Grid>
				</Box>
				<Box mt="2rem" display="flex" justifyContent="center">
					<FormControl component="fieldset">
						<FormLabel component="legend">
							<Typography variant="h5">
								<b>Select your concern</b>
							</Typography>
						</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="gender1"
							value={proposalStatus}
							onChange={handleChange}
						>
							<FormControlLabel
								value="accepted"
								control={<Radio />}
								label="I accept the deal"
							/>
							<FormControlLabel
								value="rejected"
								control={<Radio />}
								label="Request Revision"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
				{data && (
					<>
						<Box mt="1rem">
							<Typography gutterBottom align="center">
								This is digital authentication required for
								digital acceptance of privacy policy of
								homesearch18
							</Typography>
						</Box>
						<Box mt="1rem">
							<Typography gutterBottom align="center">
								I <b>{data.name}</b>, digitally express on date{' '}
								<b>{parseDate()}</b> send my concern to Grovis
								Technologies Pvt Ltd
							</Typography>
						</Box>

						<Box mt="1rem" display="flex" justifyContent="center">
							<TextField
								variant="filled"
								multiline
								rows={5}
								fullWidth
								placeholder="Write comments if any"
								className={style.commentWrapper}
							/>
						</Box>
						<Box mt="1rem" display="flex" justifyContent="center">
							<Box ml="1rem">
								<Button
									onClick={() => setIsOpen(true)}
									variant="contained"
								>
									Choose visit date
								</Button>
							</Box>
						</Box>
						<Box mt="1rem" display="flex" justifyContent="center">
							<DatePicker
								open={isOpen}
								onOpen={() => setIsOpen(true)}
								onClose={() => setIsOpen(false)}
								formLabel="Your visiting date will be"
								value={visitDate}
								onChange={(value) => {
									setVisitDate(value);
								}}
							/>
						</Box>
						<Box mt="1rem" display="flex" justifyContent="center">
							<Button
								variant="contained"
								color="primary"
								size="large"
							>
								Submit
							</Button>
						</Box>
					</>
				)}
			</Container>
		</>
	);
};

export default ManageProposal;
