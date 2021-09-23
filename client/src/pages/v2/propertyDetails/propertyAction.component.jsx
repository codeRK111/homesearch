import { Box, CircularProgress, Tooltip, Typography } from '@material-ui/core';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';
import { LinkedinIcon, WhatsappIcon } from '../../../components/v2/createIcon';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';
import useStyles, { LightTooltip } from './propertyDetailsPage.style';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FacebookIcon from '@material-ui/icons/Facebook';
import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TwitterIcon from '@material-ui/icons/Twitter';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import bookmarkIcon from '../../../assets/icons/bookmark.svg';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlobalStyles from '../../../common.style';
import whatsappIcon from '../../../assets/icons/whatsappOutline.svg';

const PropertyAction = ({
	id,
	isAuthenticated,
	toggleLoginPopup,
	selectUser,
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	let cancelToken = React.useRef(undefined);

	const [loading, setLoading] = React.useState(false);
	const [likeInfo, setLikeInfo] = React.useState({
		likes: 0,
		isLiked: false,
	});
	const [success, setSuccess] = React.useState(false);
	const [likeLoading, setLikeLoading] = React.useState(false);
	const [likeSuccess, setLikeSuccess] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			try {
				cancelToken.current = axios.CancelToken.source();
				const {
					data: { data },
				} = await axios.post(
					apiUrl('/like-property/get-property-likes', 2),
					{
						property: id,
						user: isAuthenticated ? selectUser._id : null,
					},
					{
						cancelToken: cancelToken.current.token,
					}
				);
				setLikeInfo(data);
			} catch (error) {
				setLikeInfo({
					likes: 0,
					isLiked: false,
				});
			}
		})();
	}, [isAuthenticated]);

	const saveProperty = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem('JWT_CLIENT');
			cancelToken.current = axios.CancelToken.source();
			await axios.post(
				apiUrl('/save-property', 2),
				{
					property: id,
				},
				{
					cancelToken: cancelToken.current.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setLoading(false);
			setSuccess(true);
		} catch (error) {
			setLoading(false);
			setSuccess(false);
		}
	};
	const likeProperty = async () => {
		try {
			setLikeLoading(true);
			const token = localStorage.getItem('JWT_CLIENT');
			cancelToken.current = axios.CancelToken.source();
			await axios.post(
				apiUrl('/like-property', 2),
				{
					property: id,
				},
				{
					headers: {
						cancelToken: cancelToken.current.token,
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setLikeLoading(false);
			setLikeSuccess(true);
			setLikeInfo((prevState) => ({
				...prevState,
				likes: prevState.likes + 1,
			}));
		} catch (error) {
			setLikeLoading(false);
			setLikeSuccess(false);
		}
	};

	const onSave = () => {
		if (isAuthenticated) {
			saveProperty();
		} else {
			toggleLoginPopup(true);
		}
	};
	const onLike = () => {
		if (isAuthenticated) {
			likeProperty();
		} else {
			toggleLoginPopup(true);
		}
	};
	return (
		<div className={classes.utilsWrapper}>
			<div className={globalClasses.alignCenter}>
				<span className={globalClasses.smText}>{likeInfo.likes}</span>
				<Box ml="0.5rem">
					{likeSuccess || likeInfo.isLiked ? (
						<Box className={globalClasses.alignCenter}>
							<ThumbUpIcon
								className={globalClasses.colorUtil}
								style={{
									fontSize: '2.1rem',
								}}
							/>
						</Box>
					) : likeLoading ? (
						<CircularProgress />
					) : (
						<ThumbUpIcon
							className={clsx(
								classes.utilsIcon,
								globalClasses.pointer,
								globalClasses.colorPrimary
							)}
							style={{
								fontSize: '2.1rem',
							}}
							onClick={onLike}
						/>
					)}
				</Box>
			</div>
			<div className={globalClasses.flexCenter}>
				<LightTooltip
					placement="top"
					arrow
					interactive
					title={
						<Box className={globalClasses.alignCenter}>
							<FacebookShareButton
								url="https://homesearch18.com/#/"
								quote="Homesearch18"
							>
								<FacebookIcon color="primary" />
							</FacebookShareButton>
							<Box ml="1rem">
								<TwitterShareButton
									url="https://homesearch18.com/#/"
									title="Homesearch18"
								>
									<TwitterIcon color="primary" />
								</TwitterShareButton>
							</Box>
							<Box ml="1rem">
								<LinkedinShareButton
									url="https://homesearch18.com/#/"
									title="Homesearch18"
								>
									<LinkedinIcon size={32} round />
								</LinkedinShareButton>
							</Box>
							<Box ml="1rem">
								<WhatsappShareButton
									url="https://homesearch18.com/#/"
									title="Homesearch18"
									separator=":: "
								>
									<WhatsappIcon size={32} round />
								</WhatsappShareButton>
							</Box>
						</Box>
					}
				>
					{/* <img
												src={rocketIcon}
												alt="Rocket"
												className={classes.utilsIcon}
											/> */}
					<ShareIcon className={classes.shareIcon} />
				</LightTooltip>
			</div>
			<Tooltip title="Share on whatsapp">
				<div className={globalClasses.justifyCenter}>
					<WhatsappShareButton
						url="https://homesearch18.com/#/"
						title="Homesearch18"
						separator=":: "
					>
						<img
							src={whatsappIcon}
							alt="WhatsApp"
							className={classes.utilsIcon}
						/>
					</WhatsappShareButton>
				</div>
			</Tooltip>
			<Tooltip title="Save Property">
				<div className={globalClasses.justifyCenter}>
					{success ? (
						<Box className={globalClasses.alignCenter}>
							<CheckCircleIcon
								className={globalClasses.colorUtil}
							/>
							<Typography variant="caption">Saved</Typography>
						</Box>
					) : loading ? (
						<CircularProgress />
					) : (
						<img
							onClick={onSave}
							src={bookmarkIcon}
							alt="BookMark"
							className={clsx(
								classes.utilsIcon,
								globalClasses.pointer
							)}
						/>
					)}
				</div>
			</Tooltip>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyAction);
