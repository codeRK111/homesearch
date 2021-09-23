import React, { useCallback, useEffect, useState } from 'react';

import { Blog } from '../../model/blog.interface';
import Loader from '../../components/Loader';
import { PageWrapper } from '../../components/UI/Container';
import { RouteComponentProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import UpdateBlogForm from './form';
import { asyncFetchBlogDetails } from '../../API/blog';

interface IParam {
	id: string;
}
const UpdateBlogPage: React.FC<RouteComponentProps<IParam>> = ({
	match: {
		params: { id },
	},
}) => {
	// State
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<Blog | null>(null);

	// Fetch leads
	const fetchLeadDetails = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await asyncFetchBlogDetails(id);
			setLoading(false);
			setData(resp);
			setError('');
		} catch (error: any) {
			setLoading(false);
			setData(null);
			setLoading(false);
			setError(error.message);
		}
	}, [id]);

	useEffect(() => {
		fetchLeadDetails();
	}, [fetchLeadDetails]);
	return (
		<PageWrapper>
			<Loader open={loading} />

			{error && <Typography color="error">{error}</Typography>}
			{data && <UpdateBlogForm data={data} id={id} />}
		</PageWrapper>
	);
};

export default UpdateBlogPage;
