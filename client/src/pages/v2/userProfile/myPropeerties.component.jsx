import { Box } from '@material-ui/core';
import React from 'react';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selectors';
import useGlobalStyles from '../../../common.style';
import useStyles from './userProfile.style';

const MyProperties = ({ user }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const cancelToken = React.useRef(undefined);
	const [loading, setLoading] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				cancelToken.current = axios.CancelToken.source();
				const token = localStorage.getItem('JWT_CLIENT');
				const {
					data: {
						data: { properties },
					},
				} = await axios.get(
					apiUrl('/property/user/my-properties/all', 2),
					{
						cancelToken: cancelToken.current.token,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(properties);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		})();
	}, []);

	return (
		<Box className={classes.pagePadding}>
			<Box
				className={clsx(
					globalClasses.alignCenter,
					globalClasses.justifySpaceBetween
				)}
			>
				<h2>Properties Posted By {user.name}</h2>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(MyProperties);
