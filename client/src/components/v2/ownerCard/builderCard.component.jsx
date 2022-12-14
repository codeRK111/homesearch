import { Avatar, Box, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { badge, call, comment, whatsapp } from '../../../utils/statc';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';

import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
	user,
	setSnackbar,
	property,
	type,
	pFor = null,
	pType = null,
	builderId = null,
	queryOn = 'project',
}) => {
	const builderImage = owner.logo
		? `/assets/builders/${owner.logo}`
		: defaultImage;
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

	const onClick = (queryType) => {
		return new Promise((resolve, reject) => {
			const data = {
				project: property._id,
				queryForBuilder: builderId ? builderId : property.builder._id,
				queryFor: 'builder',
				queryOn,
				queryType,
				details: {
					pType,
					pFor: type,
				},
			};

			cancelToken.current = axios.CancelToken.source();
			const token = localStorage.getItem('JWT_CLIENT');
			axios
				.post(apiUrl(`/query/user/add-query`, 2), data, {
					cancelToken: cancelToken.current.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((resp) => {
					resolve(resp.data);
				})
				.catch((error) => {
					let message = '';
					if (!!error.response) {
						message = error.response.data.message;
					} else {
						message = error.message;
					}
					console.log(message);
					reject(message);
				});
		});
	};

	const onCallClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			setLoading((prevState) => ({
				...prevState,
				call: true,
			}));
			onClick('number')
				.then((resp) => {
					setLoading((prevState) => ({
						...prevState,
						call: false,
					}));
					setNumberInfo({
						display: true,
						number: owner.phoneNumber,
					});
					setError(null);
				})
				.catch((err) => {
					setNumberInfo({
						display: true,
						number: owner.phoneNumber,
					});
					setError(err);
				});
		}
	};
	const onEmailClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			setLoading((prevState) => ({
				...prevState,
				message: true,
			}));
			onClick('message')
				.then((resp) => {
					setLoading((prevState) => ({
						...prevState,
						message: false,
					}));

					setSuccess('We received your query successfully');
					setError(null);
				})
				.catch((err) => {
					setLoading((prevState) => ({
						...prevState,
						message: false,
					}));
					setSuccess(null);
					setError(err);
				});
		}
	};

	const onWhatsppClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			setLoading((prevState) => ({
				...prevState,
				whatspp: true,
			}));
			onClick('whatsapp')
				.then((resp) => {
					setLoading((prevState) => ({
						...prevState,
						whatspp: false,
					}));

					setSuccess(null);
					setError(null);
					const text = `Hello, I am a homesearch user and I am interested for ${property.title}`;
					window.location.href = `https://wa.me/91${
						owner.phoneNumber
					}?text=${encodeURI(text)}`;
				})
				.catch((err) => {
					setLoading((prevState) => ({
						...prevState,
						whatspp: false,
					}));
					setSuccess(null);
					setError(err);
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
						<div className={classes.ownerType}>Builder</div>
						<h2>{owner.developerName.toUpperCase()}</h2>
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
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerCard);
