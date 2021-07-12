import { AppBar, Avatar, Box } from '@material-ui/core';
import React, { useState } from 'react';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';

import badgeIcon from '../../../assets/icons/badge.svg';
import callIcon from '../../../assets/icons/call.svg';
import clsx from 'clsx';
import commentIcon from '../../../assets/icons/comment.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import useGlobalStyles from '../../../common.style';
import useStyles from './ownerCard.style';
import whatsappDefaultIcon from '../../../assets/icons/whatsapp.svg';

const OwnerCard = ({
	owner,
	isAuthenticated,
	toggleLoginPopup,
	user,
	setSnackbar,
	property,
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const [numberInfo, setNumberInfo] = useState({
		display: false,
		number: '',
	});
	const [emailInfo, setEmailInfo] = useState({
		display: false,
		email: '',
	});

	const onCallClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			// if (user.mobileStatus === 'public') {
			// 	setNumberInfo({
			// 		display: true,
			// 		number: owner.number,
			// 	});
			// } else {
			// 	setNumberInfo({
			// 		display: true,
			// 		number: 'Number is private',
			// 	});
			// }
			setNumberInfo({
				display: true,
				number: owner.number,
			});
		}
	};
	const onEmailClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			setEmailInfo({
				display: true,
				email: owner.email ? owner.email : 'Not Provided',
			});
		}
	};

	const onWhatsppClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			const text = `Hello, I am a homesearch user and I am interested for ${property.title}`;
			window.location.href = `https://wa.me/${
				owner.number
			}?text=${encodeURI(text)}`;
		}
	};
	return (
		<AppBar position="sticky" color="transparent" elevation={0}>
			<div className={classes.rightWrapper}>
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
							src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100"
							className={classes.avatar}
						/>
						<img
							src={badgeIcon}
							alt="Badge"
							className={classes.commentIcon}
						/>
					</div>
					<div>
						<div className={classes.ownerInfo}>
							<div className={classes.ownerType}>
								Property Owner
							</div>
							<h2>{owner.name.toUpperCase()}</h2>
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
									{numberInfo.display ? (
										<span className={globalClasses.xsText}>
											{numberInfo.number}
										</span>
									) : (
										<img
											src={callIcon}
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
									{emailInfo.display ? (
										emailInfo.email === 'Not Provided' ? (
											<span
												className={globalClasses.xsText}
											>
												{emailInfo.email}
											</span>
										) : (
											<a
												href={`mailto: ${emailInfo.email}`}
												className={globalClasses.xsText}
											>
												{emailInfo.email}
											</a>
										)
									) : (
										<img
											src={commentIcon}
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
									<img
										src={whatsappDefaultIcon}
										alt="Whatsapp"
										className={clsx(
											classes.ownerIcon,
											classes.iconPadding,
											globalClasses.pointer
										)}
										onClick={onWhatsppClick}
									/>
								</Box>
							</Box>
						</div>
					</div>
				</div>
			</div>
		</AppBar>
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
