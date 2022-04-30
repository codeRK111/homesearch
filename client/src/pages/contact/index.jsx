import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';
import Nav from '../../components/v2/pageNav/nav.component';
import { getBrandName } from '../../utils/render.utils';

const ContactUs = () => {
	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem">
					<Box mt="2rem" display="flex" justifyContent="center">
						<Box>
							<Typography
								variant="h4"
								component="h1"
								gutterBottom
							>
								<b>Contact Us</b>
							</Typography>
							<Typography
								variant="h5"
								component="h1"
								gutterBottom
							>
								<b>Grovis Technologies Pvt Ltd.</b>
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								<b>Registered Office</b>
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								#363,19th Main Road,1st Block,
								Rajajinagar,Banglore-560010
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								<b>Eastern and Central Zone office</b>
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								2nd, Floor, JSS STP Tower 1, Infocity, Patia,
								Bhubaneswar, Odisha 751024
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								Give us a call OR Whatsapp
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								<b>+91 8260-123-123</b>
							</Typography>
							<Typography
								variant="h6"
								component="h1"
								gutterBottom
							>
								Mail Us:{' '}
								<b>{`info@${
									getBrandName[window.location.hostname]
								}.com`}</b>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default ContactUs;
