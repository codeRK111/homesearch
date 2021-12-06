import {
	Box,
	Button,
	CircularProgress,
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
import {
	asyncGetProposalDetails,
	asyncProposalResponse,
} from '../../utils/asyncPackage';
import { parseDate, toCurrency } from '../../utils/render.utils';

import DatePicker from '../../components/formik/datePickerCustom.component';
import ErrorCard from '../../components/v2/backdropMessage';
import LoaderBackdrop from '../../components/LoaderBackdrop';
import Nav from '../../components/v2/pageNav/nav.component';
import SuccessPage from '../tenantPackages/successPage';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../redux/auth/auth.selectors';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
import { useHistory } from 'react-router-dom';
import useStyles from './proposal.style';

const ManageProposal = ({
	match: {
		params: { id },
	},
	isAuthenticated,
	toggleLoginPopup,
}) => {
	const domain = window.location.host;
	const style = useStyles();
	const history = useHistory();
	const [proposalStatus, setProposalStatus] = useState('accepted');
	const [comment, setComment] = useState('');
	const [fetchLoading, setFetchLoading] = useState(false);
	const [responseLoading, setResponseLoading] = useState(false);
	const [data, setData] = useState(null);
	const [fetchError, setFetchError] = useState(null);
	const [responseError, setResponseError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [success, setSuccess] = useState(false);
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
			setFetchError(error.message);
			setData(null);
		}
	}, [id]);

	const setResponse = async () => {
		try {
			if (!isAuthenticated) {
				toggleLoginPopup(true);
				return;
			}
			setResponseLoading(true);
			const dataToupdate = {
				proposalStatus,
				comment,
				propertyVisitDate: visitDate,
			};
			const resp = await asyncProposalResponse(id, dataToupdate);
			console.log({ resp });
			setResponseLoading(false);
			setResponseError(null);
			if (proposalStatus === 'accepted') {
				setSuccess(false);
				history.push(
					`/confirm-package/${data.proposalPackage}?hs=${data.proposedBy}`
				);
			} else {
				setSuccess(true);
			}
		} catch (error) {
			setSuccess(false);
			setResponseLoading(false);
			setResponseError(error.message);
		}
	};

	useEffect(() => {
		fetchProposal();
	}, [fetchProposal]);

	return (
		<>
			<Nav />
			<Container>
				{!!fetchError && <ErrorCard message={fetchError} />}
				<LoaderBackdrop open={fetchLoading} />
				{success ? (
					<SuccessPage heading="Thank you for your time" />
				) : (
					<>
						<Box mt="2rem">
							<Grid container spacing={3}>
								<Grid item xs={12} md={4}>
									<Typography variant="h6" gutterBottom>
										<b>From</b>
									</Typography>
									<Typography variant="h6" gutterBottom>
										<b>{domain}</b>
									</Typography>
									<Typography gutterBottom>
										<b>
											A initiative from Grovis
											Technologies Pvt. Ltd
										</b>
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
										2nd, Floor, JSS STP Tower 1, Infocity,
										Patia, Bhubbaneswar, 751024, Odisha,
										India
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
											<b>Requirement Details</b>
										</Typography>
										<Typography gutterBottom>
											Category: <b>{data.category}</b>
										</Typography>
										<Typography gutterBottom>
											<b>
												Rs{' '}
												{toCurrency(data.proposalPrice)}
											</b>
										</Typography>
										<Typography gutterBottom>
											Interested In :{' '}
											{data.propertyRequirements.map(
												(c, i) => (
													<b>{`${c}${
														i + 1 <
														data
															.propertyRequirements
															.length
															? ','
															: ''
													}`}</b>
												)
											)}
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
												Rs. {toCurrency(data.minPrice)}{' '}
												to
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
										value="declined"
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
										This is digital authentication required
										for digital acceptance of privacy policy
										of homesearch18
									</Typography>
								</Box>
								<Box mt="1rem">
									<Typography gutterBottom align="center">
										I <b>{data.name}</b>, digitally express
										on date <b>{parseDate()}</b> send my
										concern to <b>{domain}</b> a initiative
										from Grovis Technologies Pvt Ltd
									</Typography>
								</Box>

								<Box
									mt="1rem"
									display="flex"
									justifyContent="center"
								>
									<TextField
										variant="filled"
										multiline
										rows={5}
										fullWidth
										placeholder="Write comments if any"
										className={style.commentWrapper}
										value={comment}
										onChange={(e) =>
											setComment(e.target.value)
										}
									/>
								</Box>
								<Box
									mt="1rem"
									display="flex"
									justifyContent="center"
								>
									<Box ml="1rem">
										<Button
											onClick={() => setIsOpen(true)}
											variant="contained"
										>
											Choose visit date
										</Button>
									</Box>
								</Box>
								<Box
									mt="1rem"
									display="flex"
									justifyContent="center"
								>
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
								<Box
									mt="1rem"
									display="flex"
									justifyContent="center"
								>
									<div>
										<Button
											variant="contained"
											color="primary"
											size="large"
											disabled={responseLoading}
											onClick={setResponse}
											endIcon={
												responseLoading ? (
													<CircularProgress
														size={15}
														color="inherit"
													/>
												) : (
													<></>
												)
											}
										>
											Submit
										</Button>
										{responseError && (
											<Box>
												<Typography
													color="error"
													variant="caption"
												>
													{responseError}
												</Typography>
											</Box>
										)}
									</div>
								</Box>
							</>
						)}
					</>
				)}
			</Container>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProposal);
