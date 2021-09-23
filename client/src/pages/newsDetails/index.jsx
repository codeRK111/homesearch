import {
	Avatar,
	Box,
	CardMedia,
	Chip,
	Container,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@material-ui/core';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';
import { LinkedinIcon, WhatsappIcon } from '../../components/v2/createIcon';
import React, { useCallback, useRef, useState } from 'react';
import {
	capitalizeFirstLetter,
	parseDate,
	renderBlogImage,
} from '../../utils/render.utils';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ErrorBackdrop from '../../components/v2/backdropMessage';
import FacebookIcon from '@material-ui/icons/Facebook';
import Nav from '../../components/v2/pageNav/nav.component';
import Skeleton from '@material-ui/lab/Skeleton';
import TwitterIcon from '@material-ui/icons/Twitter';
import axios from 'axios';
import { getBlogDetails } from '../../utils/asyncBlog';
import useGlobalStyles from '../../common.style';
import { withAsync } from '../../hoc/withAsync';

const NewsDetailsPage = ({
	match: {
		params: { slug },
	},
	loading,
	setLoading,
	error,
	setError,
}) => {
	// API Cancel Token
	const cancelBlogsTokeb = useRef();

	const { bold, alignCenter } = useGlobalStyles();

	// State
	const [data, setData] = useState(null);

	const fetchBlogDetails = useCallback(async () => {
		try {
			cancelBlogsTokeb.current = axios.CancelToken.source();
			const resp = await getBlogDetails(
				slug,
				cancelBlogsTokeb.current,
				setLoading
			);
			setError(null);
			setData(resp);
		} catch (error) {
			setData(null);
			setError(error);
		}
	}, [setLoading, setError, slug]);

	React.useEffect(() => {
		fetchBlogDetails();

		return () => {
			if (cancelBlogsTokeb.current) {
				cancelBlogsTokeb.current.cancel();
			}
		};
	}, [fetchBlogDetails]);

	return (
		<div>
			<Nav />
			<Container component={Box} mt="1rem">
				{loading && <Loader />}
				<ErrorBackdrop open={!!error} message={error} />
				{data && (
					<Box mt="1rem" mb="1rem">
						<Chip
							label={capitalizeFirstLetter(data.category)}
							variant="outlined"
							size="medium"
							color="primary"
						/>
						<Box mt="1rem">
							<Typography
								variant="h4"
								component={'h1'}
								className={bold}
							>
								{data.title}
							</Typography>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<ListItem>
								<ListItemAvatar>
									<Avatar
										style={{ background: 'transparent' }}
									>
										<AccountCircleIcon
											color="primary"
											fontSize="large"
										/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography className={bold}>
											{data.author}
										</Typography>
									}
									secondary={parseDate(data.createdAt)}
								/>
							</ListItem>
							<div>
								{data.tags.map((c, i) => (
									<Typography
										key={i}
										variant="caption"
										className={bold}
									>
										{c}
										{i < data.tags.length - 1 && ','}&nbsp;
									</Typography>
								))}
								<Box className={alignCenter} mt="1rem">
									<FacebookShareButton
										url={window.location.href}
										quote={data.title}
									>
										<FacebookIcon color="primary" />
									</FacebookShareButton>
									<Box ml="1rem">
										<TwitterShareButton
											uurl={window.location.href}
											quote={data.title}
										>
											<TwitterIcon color="primary" />
										</TwitterShareButton>
									</Box>
									<Box ml="1rem">
										<LinkedinShareButton
											url={window.location.href}
											quote={data.title}
										>
											<LinkedinIcon size={32} round />
										</LinkedinShareButton>
									</Box>
									<Box ml="1rem">
										<WhatsappShareButton
											url={window.location.href}
											quote={data.title}
											separator=":: "
										>
											<WhatsappIcon size={32} round />
										</WhatsappShareButton>
									</Box>
								</Box>
							</div>
						</Box>
						<Box mt="1rem">
							<CardMedia
								image={renderBlogImage(data.photo)}
								style={{
									height: 500,
									backgroundSize: 'cover',
								}}
							/>
						</Box>
						<Box mt="1rem">
							<Box
								style={{
									maxWidth: '100%',
									wordBreak: 'break-all',
								}}
								dangerouslySetInnerHTML={{
									__html: data.description,
								}}
							></Box>
						</Box>
					</Box>
				)}
			</Container>
		</div>
	);
};

const Loader = () => {
	return (
		<>
			<Box height={'5vh'}>
				<Skeleton
					variant="rect"
					width={'100%'}
					height={'100%'}
					animation={'wave'}
				/>
			</Box>
			<Box height={'10vh'} mt="1rem">
				<Skeleton
					variant="rect"
					width={'100%'}
					height={'100%'}
					animation={'wave'}
				/>
			</Box>
			<Box height={'60vh'} mt="1rem">
				<Skeleton
					variant="rect"
					width={'100%'}
					height={'100%'}
					animation={'wave'}
				/>
			</Box>
		</>
	);
};

export default withAsync(NewsDetailsPage);
