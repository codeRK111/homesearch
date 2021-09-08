import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	Divider,
	FormControlLabel,
	Grid,
	IconButton,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme, withStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { addOpinion } from '../../utils/asyncProject';
import axios from 'axios';
import useGlobalStyles from '../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './surveyModal';
import { withAsync } from '../../hoc/withAsync';

const GreenCheckbox = withStyles({
	root: {
		color: '#224C7C',
		'&$checked': {
			color: '#224C7C',
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SurveyModal = ({
	open,
	handleClose,
	id,
	loading,
	setLoading,
	error,
	setError,
	fetchOpinion,
	myOpinion,
}) => {
	// Cancel Token
	const cancelToken = useRef(null);
	// Constants
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	// Style
	const globalStyle = useGlobalStyles();
	const style = useStyles();

	// State
	const [opinion, setOpinion] = useState({
		parkingEasy: false,
		walkableDistanceFromMarket: false,
		studentArea: false,
		dogFriendly: false,
		familyArea: false,
		safeArea: false,
	});
	const [success, setSuccess] = useState(false);

	// Callbacks
	const handleChange = (event) => {
		setOpinion({ ...opinion, [event.target.name]: event.target.checked });
	};

	const onSubmit = async () => {
		const arr = Object.keys(opinion).filter((c) => opinion[c]);

		if (arr.length === 0) {
			return;
		}

		try {
			cancelToken.current = axios.CancelToken.source();
			await addOpinion(id, opinion, cancelToken.current, setLoading);
			setError(null);
			setSuccess(true);
			fetchOpinion();
		} catch (error) {
			setError(error);
			setSuccess(false);
		}
	};

	useEffect(() => {
		if (myOpinion) {
			setOpinion(myOpinion);
		}
	}, [myOpinion]);

	// Cancel on unmount
	useEffect(() => {
		if (!open) {
			setError(null);
			setSuccess(false);
			return () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}
			};
		}
	}, [open]);

	return (
		<Dialog
			fullScreen={fullScreen}
			fullWidth={true}
			maxWidth={'sm'}
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			classes={{
				paper: style.paper,
			}}
		>
			<Box p="1rem" className={globalStyle.borderBox}>
				<Box
					className={`${globalStyle.justifySpaceBetween} ${globalStyle.alignCenter}`}
				>
					<h2>Please select from below</h2>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box mb="1rem">
					<Divider />
				</Box>
				{success ? (
					<Alert
						severity="success"
						action={
							<Button
								color="inherit"
								size="small"
								onClick={handleClose}
							>
								Ok
							</Button>
						}
					>
						Thank you for your time
					</Alert>
				) : (
					<>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<FormControlLabel
									control={
										<GreenCheckbox
											checked={opinion.parkingEasy}
											onChange={handleChange}
											name="parkingEasy"
										/>
									}
									label="Parking is easy"
									classes={{
										label: style.label,
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControlLabel
									control={
										<GreenCheckbox
											checked={
												opinion.walkableDistanceFromMarket
											}
											onChange={handleChange}
											name="walkableDistanceFromMarket"
										/>
									}
									label="Walkable distance from market"
									classes={{
										label: style.label,
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControlLabel
									control={
										<GreenCheckbox
											checked={opinion.studentArea}
											onChange={handleChange}
											name="studentArea"
										/>
									}
									label="It's a student area"
									classes={{
										label: style.label,
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControlLabel
									control={
										<GreenCheckbox
											checked={opinion.dogFriendly}
											onChange={handleChange}
											name="dogFriendly"
										/>
									}
									label="It's dog friendly"
									classes={{
										label: style.label,
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControlLabel
									control={
										<GreenCheckbox
											checked={opinion.familyArea}
											onChange={handleChange}
											name="familyArea"
										/>
									}
									label="It's a family area"
									classes={{
										label: style.label,
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControlLabel
									control={
										<GreenCheckbox
											checked={opinion.safeArea}
											onChange={handleChange}
											name="safeArea"
										/>
									}
									label="It's a safe area"
									classes={{
										label: style.label,
									}}
								/>
							</Grid>
						</Grid>
						{error && <p style={{ color: 'red' }}>{error}</p>}
						<Box mt="1rem" className={globalStyle.justifyCenter}>
							<button
								className={globalStyle.buttonShadow}
								onClick={onSubmit}
								disabled={loading}
							>
								Submit
								{loading && (
									<Box ml="1rem">
										<CircularProgress
											size={20}
											color="inherit"
										/>
									</Box>
								)}
							</button>
						</Box>
					</>
				)}
			</Box>
		</Dialog>
	);
};

export default withAsync(SurveyModal);
