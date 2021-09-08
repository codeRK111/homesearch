import { Box, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';

import ChipWrapper from '../../../components/v2/chipWrapper/chipWrapper.component';
import Skeleton from '@material-ui/lab/Skeleton';
import SurveyModal from '../../../components/surveyModal';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getOpinion } from '../../../utils/asyncProject';
import likeIcon from '../../../assets/icons/like.svg';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlobalStyles from '../../../common.style';
import useStyles from './projectDetailsPage.style';
import { withAsync } from '../../../hoc/withAsync';

const locals = [
	{
		label: 'Parking is easy',
		name: 'parkingEasy',
	},
	{
		label: 'Walkable distance from market',
		name: 'walkableDistanceFromMarket',
	},
	{
		label: "It's a student area",
		name: 'studentArea',
	},
	{
		label: "It's dog friendly",
		name: 'dogFriendly',
	},
	{
		label: "It's a family area",
		name: 'familyArea',
	},
	{
		label: "It's a safe area",
		name: 'safeArea',
	},
];

const defaultState = {
	parkingEasy: 0,
	walkableDistanceFromMarket: 0,
	studentArea: 0,
	dogFriendly: 0,
	familyArea: 0,
	safeArea: 0,
};

const LocalOpinion = ({
	isAuthenticated,
	toggleLoginPopup,
	projectId,
	loading,
	setLoading,
	error,
	setError,
	user,
}) => {
	// Cancel Token
	const cancelToken = useRef(null);
	// Style
	const globalStyle = useGlobalStyles();
	const style = useStyles();

	// State
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(null);
	const [myOpinion, setMyOpinion] = useState(null);

	const fetchOpinion = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const resp = await getOpinion(
				projectId,
				user.id ? user.id : null,
				cancelToken.current,
				setLoading
			);
			setData(resp.opinion);
			if (resp.myOpinion) {
				setMyOpinion(resp.myOpinion);
			}
			setError(null);
		} catch (error) {
			setError(error);
			setData(null);
			setMyOpinion(null);
		}
	}, [projectId, setError, setLoading, user.id]);

	// Callbacks
	const handleModal = (status) => () => {
		setOpen(status);
	};

	const onClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
			return;
		}

		handleModal(true)();
	};

	useEffect(() => {
		fetchOpinion();
	}, [fetchOpinion]);

	// Cancel on unmount
	useEffect(() => {
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, []);

	return (
		<div>
			<SurveyModal
				open={open}
				handleClose={handleModal(false)}
				id={projectId}
				fetchOpinion={fetchOpinion}
				myOpinion={myOpinion}
			/>
			<Box mb="2rem">
				<h2 className={globalStyle.colorPrimary}>
					What Locals Say About The Area
				</h2>
			</Box>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{loading && (
				<Grid container spacing={3}>
					{Array.from({ length: 6 }, (_, i) => i + 1).map((c) => (
						<Grid key={c} item xs={12} md={4}>
							<Skeleton width={'100%'} height={50} />
						</Grid>
					))}
				</Grid>
			)}
			<Grid container spacing={3}>
				{data &&
					!loading &&
					locals.map((c, i) => (
						<Grid key={i} item xs={12} md={4}>
							<div className={globalStyle.alignCenter}>
								<ChipWrapper>
									<div
										className={clsx(
											globalStyle.alignCenter,
											globalStyle.justifyCenter
										)}
									>
										<img
											src={likeIcon}
											alt="Like"
											className={style.likeIcon}
										/>
										<Box ml="0.5rem">
											<h4
												className={clsx(
													globalStyle.colorPrimary,
													globalStyle.noSpace,
													style.likeValue
												)}
											>
												{data[c.name]
													? data[c.name]
													: 0}
												%
											</h4>
										</Box>
									</div>
								</ChipWrapper>
								<Box ml="1rem">
									<h4
										className={clsx(
											globalStyle.colorPrimary,
											globalStyle.noSpace
										)}
									>
										{c.label}
									</h4>
								</Box>
							</div>
						</Grid>
					))}
				<Grid item xs={12} md={4}>
					<div className={globalStyle.alignCenter}>
						<button
							className={globalStyle.buttonShadow}
							onClick={onClick}
						>
							Take Part In The Survey
						</button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAsync(LocalOpinion));
