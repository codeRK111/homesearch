import React, { useCallback, useEffect, useState } from 'react';

import AddTestimonialDialog from '../../components/Dialogs/addTestimonial';
import { Button } from '../../components/UI/Button';
import { FetchTestimonialResponseData } from '../../model/testimonial';
import { PageWrapper } from '../../components/UI/Container';
import { SpaceBetween } from '../../components/UI/Flex';
import TablePagination from '../../components/Table/pagination';
import TestimonialsTable from '../../components/Table/testimonials';
import Typography from '@material-ui/core/Typography';
import { asyncFetchTestimonial } from '../../API/testimonial';
import { fetchStrategiesFilter } from '../../API/leadStrategy';

const TestimonialPage = () => {
	// State
	const [addDialogStatus, setAddDialogStatus] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchTestimonialResponseData>({
		totalDocs: 0,
		testimonials: [],
	});

	// Callbacks
	const manageAddDialog =
		(status: boolean): (() => void) =>
		() => {
			setAddDialogStatus(status);
		};

	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch lead strategies
	const fetchLeadStrategies = useCallback(async () => {
		try {
			setLoading(true);
			const filter: fetchStrategiesFilter = {
				page,
				limit,
				status: 'active',
			};

			const resp = await asyncFetchTestimonial(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				testimonials: [],
			});
			setLoading(false);
		}
	}, [page, limit]);
	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchLeadStrategies();
	}, [fetchLeadStrategies]);

	return (
		<PageWrapper>
			<AddTestimonialDialog
				open={addDialogStatus}
				handleClose={manageAddDialog(false)}
				fetchLeads={fetchLeadStrategies}
			/>
			<SpaceBetween mb="1rem">
				<Typography variant="h5">Testimonials</Typography>
				<Button variant="contained" onClick={manageAddDialog(true)}>
					Add Testimonial
				</Button>
			</SpaceBetween>

			<TestimonialsTable
				testimonials={data.testimonials}
				loading={loading}
				fetchLeads={fetchLeadStrategies}
			/>
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</PageWrapper>
	);
};

export default TestimonialPage;
