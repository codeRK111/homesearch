import { Box, Container, Typography } from '@material-ui/core';

import Nav from '../../components/v2/pageNav/nav.component';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		'& > p': {
			lineHeight: 1.5,
			fontWeight: 500,
			textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
			letterSpacing: 0.5,
		},
	},
}));

const Refund = () => {
	const { wrapper } = useStyles();
	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem">
					<Box mt="2rem" className={wrapper}>
						<Typography variant="h4" component="h1" gutterBottom>
							<b>Refunds & Cancellation Policy</b>
						</Typography>
						<p>
							Users can access the website for preliminary
							browsing purpose that is free of cost.
						</p>
						<p>
							Homesearch18.com offers a multiple plans of Services
							which the User may subscribe.
						</p>
						<p>
							The plan subscription fee paid by the User is
							non-refundable at any circumstances.
						</p>
						<p>
							Homesearch18.com reserves the right to revise the
							fee of any subscription plan without notice to the
							User at any time.
						</p>
						<p>
							Once you subscribe our Plan, a relationship
							Manager/Executive will be assigned to you.
							Relationship manager will find a suitable property
							on your behalf and arrange a visit for you.
							You&#39;ll get a call from your relationship manager
							within 24 hrs of doing payment. Once you subscribe
							the plan you indicate that you have read this refund
							policy and that you agree with and fully accept the
							terms of this refund policy.
						</p>
						<p>
							Support provided by the relationship manager will be
							depends on which plan you subscribe. There are
							different kinds of plan available.
						</p>
						<p>
							Relationship Manager/Executive will be available to
							assist you on every working day from 10:00 AM to
							6:00 PM. Relation Manager/Executive will not be
							available on Sunday and Public Holidays.
						</p>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default Refund;
