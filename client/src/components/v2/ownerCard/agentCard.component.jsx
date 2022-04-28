import { Avatar, Box, CircularProgress, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { badge, call, comment, logo, whatsapp } from '../../../utils/statc';
import {
	capitalizeFirstLetter,
	getBrandName,
	hsiID,
} from '../../../utils/render.utils';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';

import { addAgentQuery } from '../../../utils/asyncQuery';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../../redux/auth/auth.selectors';
import useGlobalStyles from '../../../common.style';
import useStyles from './ownerCard.style';

const defaultImage =
	'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100';

const renderKey = {
	property: 'property',
	project: 'project',
	projectproperty: 'projectProperty',
};

const OwnerCard = ({
	owner,
	isAuthenticated,
	toggleLoginPopup,
	setSnackbar,
	property,
	type,
}) => {
	const builderImage = logo;
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const cancelToken = React.useRef(undefined);
	const [numberInfo, setNumberInfo] = useState({
		display: false,
		number: '',
	});

	const [loading, setLoading] = useState({
		call: false,
		message: false,
		whatspp: false,
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleLoading = (type) => (state) => {
		setLoading((prevState) => ({
			...prevState,
			[type]: state,
		}));
	};

	const onClick = (queryType) => {
		return new Promise((resolve, reject) => {
			const data = {
				type,
				[renderKey[type]]: property._id,
				agent: owner.id,
				queryType,
			};

			cancelToken.current = axios.CancelToken.source();
			addAgentQuery(data, cancelToken.current, handleLoading(queryType))
				.then((resp) => {
					resolve(resp);
					setError(null);
				})
				.catch((error) => {
					setError(error);
					reject(error);
				});
		});
	};

	const onCallClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			onClick('number')
				.then((resp) => {
					setNumberInfo({
						display: true,
						number: owner.number,
					});
				})
				.catch((err) => {
					setNumberInfo({
						display: true,
						number: owner.phoneNumber,
					});
				});
		}
	};
	const onEmailClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			onClick('message')
				.then((resp) => {
					setSuccess('We received your query successfully');
					setError(null);
				})
				.catch((err) => {
					setSuccess(null);
				});
		}
	};

	const onWhatsppClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			onClick('whatsapp')
				.then((resp) => {
					setSuccess(null);
					const text = `Hello, I am a homesearch user and I am interested for ${property.title}`;
					window.open(
						`https://wa.me/91${owner.number}?text=${encodeURI(
							text
						)}`,
						'_blank'
					);
				})
				.catch((err) => {
					setSuccess(null);
				});
		}
	};

	React.useEffect(() => {
		if (success) {
			setSnackbar({
				open: true,
				message: success,
				severity: 'success',
			});
		}
	}, [success, setSnackbar]);
	React.useEffect(() => {
		if (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	}, [error, setSnackbar]);

	React.useEffect(() => {
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, []);
	return (
		<div className={classes.rightWrapper}>
			{/* <h3>{owner.logo}</h3> */}
			{/* <pre>{JSON.stringify(owner, null, 2)}</pre> */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<div className={classes.avatarWrapper}>
					<Avatar
						alt="Remy Sharp"
						src={builderImage}
						className={classes.avatar}
					/>
					{/* <img
							src={builderImage}
							alt=""
							className={classes.avatar}
						/> */}
					<img
						src={badge}
						alt="Badge"
						className={classes.commentIcon}
					/>
				</div>
				<div>
					<div className={classes.ownerInfo}>
						<div className={classes.ownerType}>
							{capitalizeFirstLetter(
								getBrandName[window.location.hostname]
							)}
						</div>
						<h2>{owner.name}</h2>
						{hsiID(owner.docNumber) && (
							<Typography
								align="center"
								className={classes.agentID}
							>
								ID: {hsiID(owner.docNumber)}
							</Typography>
						)}
						{/* <Box
                                className={clsx(
                                    globalClasses.justifySpaceBetween,
                                    globalClasses.alignCenter
                                )}
                            >
                                <span
                                    className={clsx(
                                        classes.ownerId,
                                        globalClasses.xsText,
                                        globalClasses.bold
                                    )}
                                >
                                    ID : R04913231c
                                </span>
                                <Link
                                    className={clsx(
                                        globalClasses.colorWarning,
                                        globalClasses.xsText,
                                        globalClasses.bold
                                    )}
                                >
                                    {' '}
                                    View Listing
                                </Link>
                            </Box> */}
						<Box
							p="0.4rem"
							className={clsx(
								globalClasses.alignCenter,
								globalClasses.justifyCenter
							)}
						>
							<Box className={classes.borderRight}>
								{loading.call ? (
									<CircularProgress
										color="primary"
										size={15}
									/>
								) : numberInfo.display ? (
									<span className={globalClasses.xsText}>
										{numberInfo.number}
									</span>
								) : (
									<img
										src={call}
										alt="Call"
										className={clsx(
											classes.ownerIcon,
											globalClasses.pointer
										)}
										onClick={onCallClick}
									/>
								)}
							</Box>
							<Box className={classes.borderRight}>
								{loading.message ? (
									<CircularProgress
										color="primary"
										size={15}
									/>
								) : (
									<img
										src={comment}
										alt="Comment"
										className={clsx(
											classes.ownerIcon,
											globalClasses.pointer
										)}
										onClick={onEmailClick}
									/>
								)}
							</Box>
							<Box>
								{loading.whatspp ? (
									<CircularProgress
										color="primary"
										size={15}
									/>
								) : (
									<img
										src={whatsapp}
										alt="Whatsapp"
										className={clsx(
											classes.ownerIcon,
											classes.iconPadding,
											globalClasses.pointer
										)}
										onClick={onWhatsppClick}
									/>
								)}
							</Box>
						</Box>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerCard);
