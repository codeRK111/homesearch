import {
	Avatar,
	Box,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';
import {
	apiUrl,
	capitalizeFirstLetter,
	renderPropertyTypes,
	renderQueryTypes,
} from '../../utils/render.utils';

import ApartmentIcon from '@material-ui/icons/Apartment';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import CalendarToday from '@material-ui/icons/CalendarToday';
import CategoryIcon from '@material-ui/icons/Category';
import EmailIcon from '@material-ui/icons/Email';
import HttpIcon from '@material-ui/icons/Http';
import MessageIcon from '@material-ui/icons/Message';
import NameIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { selectQueries } from '../../redux/query/query.selector';
import { setSnackbar } from '../../redux/ui/ui.actions';
import useStyles from './queries.styles';

const Queries = ({
	match: {
		params: { id },
	},
	setSnackbar,
}) => {
	const classes = useStyles();
	const cancelToken = React.useRef(undefined);
	const [loading, setLoading] = React.useState(false);

	const [data, setData] = React.useState(null);

	const fetchQueries = () => {
		cancelToken.current = axios.CancelToken.source();
		const token = localStorage.getItem('JWT');
		setLoading(true);
		axios
			.get(
				apiUrl(`/query/details/${id}`, 'v2'),

				{
					cancelToken: cancelToken.current.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((resp) => {
				setLoading(false);
				setData(resp.data.data.query);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setSnackbar({
					open: true,
					message,
					severity: 'error',
				});
				return;
			});
	};

	const renderTitle = (info) => {
		switch (info.type) {
			case 'property':
				return info.property.title;
			case 'project':
				return info.project.title;
			case 'projectproperty':
				return info.projectProperty.title;

			default:
				break;
		}
	};

	const redirectUrl = (data) => {
		switch (data.type) {
			case 'property':
				return `https://homesearch18.com/v2/property-details/${data.property.id}`;
			case 'project':
				return `https://homesearch18.com/project-details/${data.project.id}`;
			case 'projectproperty':
				return `https://homesearch18.com/project-property/${data.projectProperty.id}`;

			default:
				break;
		}
	};
	const ownerInfo = (data) => {
		const info = {};
		if (data.type === 'property') {
			info.name = data.owner.name;
			info.email = data.owner.email;
			info.number = data.owner.number;
		} else {
			info.name = data.builder.developerName;
			info.email = data.builder.email;
			info.number = data.builder.phoneNumber;
		}
		return info;
	};

	React.useEffect(() => {
		fetchQueries();
	}, [id]);

	// Cancel Request
	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel(
					'Operation canceled due to new request'
				);
			}
		};
	}, []);
	return (
		<Box p="1rem">
			<div>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					data && (
						<Grid container spacing={5}>
							<Grid item xs={12} md={4}>
								<h3 className={classes.noSpace}>
									User Details
								</h3>
								<List>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<NameIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={data.userName}
											secondary="Username"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<EmailIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={data.email}
											secondary="Email"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<PhoneIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={data.phoneNumber}
											secondary="Phone Number"
										/>
									</ListItem>

									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<CalendarToday />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={moment(
												data.createdAt
											).format('Do MMM')}
											secondary="Posted On"
										/>
									</ListItem>
								</List>
							</Grid>
							<Grid item xs={12} md={4}>
								<h3 className={classes.noSpace}>
									Property Details
								</h3>
								<List>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<ApartmentIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={renderTitle(data)}
											secondary="Title"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<CategoryIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={renderPropertyTypes(
												data.pType
											)}
											secondary="Type"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<BeachAccessIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={capitalizeFirstLetter(
												data.pFor
											)}
											secondary="Property For"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<HttpIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={
												<a
													href={redirectUrl(data)}
													target="_blank"
													rel="noopener noreferrer"
												>
													View Property
												</a>
											}
											secondary="Property Link"
										/>
									</ListItem>
								</List>
							</Grid>
							<Grid item xs={12} md={4}>
								<h3 className={classes.noSpace}>Owner Info</h3>
								<List>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<NameIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={ownerInfo(data).name}
											secondary={
												data.type === 'property'
													? 'Name'
													: 'Developer Name'
											}
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<EmailIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={ownerInfo(data).email}
											secondary="Email"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<PhoneIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={ownerInfo(data).number}
											secondary="Phone Number"
										/>
									</ListItem>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<MessageIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={renderQueryTypes(
												data.queryType
											)}
											secondary="Query For"
										/>
									</ListItem>
								</List>
							</Grid>
						</Grid>
					)
				)}
			</div>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	queries: selectQueries,
});

const dispatchStateToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
