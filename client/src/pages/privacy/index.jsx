import { Box, Container, Typography } from '@material-ui/core';
import { capitalizeFirstLetter, getHostName } from '../../utils/render.utils';

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

const PrivacyPolicies = () => {
	const { wrapper } = useStyles();
	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem" className={wrapper}>
					<Typography variant="h4" component="h1">
						Privacy Policies
					</Typography>
					<p>
						Welcome to {capitalizeFirstLetter(getHostName())},The
						Website and Mobile Application,PWA Application is owned
						by GROVIS TECHNOLOGIES PVT LTD, a company incorporated
						under the Indian Companies Act, 1956(Company
						Registration No. 129880, CIN-(U74999KA2019PTC129880),and
						having its registered Ofice at #363, 19th Main Road 1st
						Block Rajajinagar,Bangalore-560010
					</p>
					<p>
						{capitalizeFirstLetter(getHostName())} is committed to
						protecting your privacy. As according with the
						provisions of the Information Technology Act, 2000 and
						the rules made thereunder that require publishing the
						rules and regulations, privacy policy and terms of use
						on an online portal of the{' '}
						{capitalizeFirstLetter(getHostName())}.
					</p>
					<p>
						We have prepared this Privacy Policy to describe to you
						detail about the Personal Data (as defined below) we
						collect from users of our website or Mobile Apps,
						located at {capitalizeFirstLetter(getHostName())} (the
						“Website” and &quot;Mobile Apps&quot;) and The Company
						is engaged in the business of facilitating/Arranging
						tenants, buyers ,Owners and sellers to explore and
						identify many kinds of properties including lands,
						buildings, houses, flats, and other residential
						properties and enabling them to carry on transaction of
						purchase, sale, renting or otherwise relating to movable
						and immovable properties and other related services
						(“Services”).
					</p>
					<p>
						By submitting Personal Data through our website or
						Mobile Apps, you agree to the terms of this Privacy
						Policy and you expressly consent to the collection, use
						and disclosure of your Personal Data in accordance with
						this Privacy Policy.
					</p>
					<p>
						For the purpose of providing you with quality services,
						we require you to register yourself on our Website OR
						thought Mobile Apps and get yourself registered. If you
						choose to become a registered member of our Website OR
						Mobile Apps, you must provide your name, e-mail address,
						phone number, Company Name,City Name,Password
						Additionally, {capitalizeFirstLetter(getHostName())}{' '}
						collects your other personal details including but not
						limited to your Login by third party API, feedback,
						suggestions,Schedule an Appointment..etc (“Personal
						Information&quot;) and Our Website OR Mobile App does
						not collect information about you except when you
						specifically and knowingly to provide it.
					</p>
					<p>
						We do not intentionally gather Personal Data from
						visitors who are below the age of 18 years. If a user
						below18 years submits Personal Data to our Website OR
						through Mobile App and we found that the Personal Data
						is the information of a user below 18 years, we will
						delete the information as soon as possible.
					</p>
					<p>
						If you provide us feedback or contact us via e-mail, we
						will collect your name and e-mail address, as well as
						any other content included in the e-mail, in order to
						send you a reply.
					</p>
					<p>
						If required in future we can share this information with
						third party service providers or third party advertisers
						for our online advertising and for other purpose, as we
						may desire. By usage of our Website or Mobile App you
						expressly permit us to access such information for
						sending a alert message on mobile and an email.
					</p>
					<p>
						When you post your property details OR your requirement
						details (text, images, photographs, messages,
						address,details,Phone No. or any other kind of content
						that is not your e-mail address) on our website or
						through Mobile App, the information contained in your
						posting will be stored in our servers and other users
						will be able to see it, along with your profile photo
						and any other information that you choose to make public
						on your listing page . The information that you provide
						in your Profile will be visible to others, including
						anonymous visitors to the website or Mobile App.
					</p>
					<p>
						To make our website and Service more useful to you, our
						servers (which may be hosted by a third party service
						provider) collect information from you, including your
						browser type, operating system, Internet Protocol (“IP”)
						address (a number that is automatically assigned to your
						computer when you use the Internet, which may vary from
						session to session), and a date/time for your visit.
					</p>
					<p>
						Like many other online services, most web browsers
						automatically accept cookies we use cookies to collect
						information. “Cookies” are small pieces of information
						that a website sends to your computer’s hard drive while
						you are viewing the website. We may use both session
						Cookies (which expire once you close your web browser)
						and persistent Cookies (which stay on your computer
						until you delete browse ring history) to provide you
						with a more personal and interactive experience on our
						Site. This type of information is collected to make the
						Site more useful to you and meet your special interests
						and needs. However, blocking cookies may disable certain
						features on our Website and may make it impossible for
						you to use certain services available on our Website.
					</p>
					<p>
						{capitalizeFirstLetter(getHostName())} makes every
						reasonable effort to preserve the privacy and
						confidentiality of your information shared with us. We
						implement standard measures to protect against
						unauthorized access to and unlawful interception of
						Personal Information. However, in internet we cannot
						fully eliminate security risks. The Company makes no
						representation that the Website is appropriate to be
						used or accessed outside India and from time to time,
						the Company may update this Privacy Policy.
					</p>
					<p>
						We use Google Analytics to help analyze how users using
						our website. Google Analytics uses Cookies to collect
						information such as how often users visit the website,
						what pages they visit. We use the information we get
						from Google Analytics only to improve our website and
						Service. Google Analytics collects only the IP address
						assigned to you on the date you visit the website,
						rather than your name or other personally identifying
						information. We do not combine the information generated
						through the use of Google Analytics with your Personal
						Data. Although Google Analytics plants a persistent
						Cookie on your web browser to identify you as a unique
						user the next time you visit the our website.
					</p>
					<p>
						We allow you to use your Facebook and Google ID to set
						up an Account. If you wish to use your Facebook or
						Google account you are taken to the Facebook or Google
						website to login to your account and this information is
						then shared with us for the sole purpose of setting up
						your Account.
					</p>
					<p>
						We receive testimonials and comments from users who have
						had any experiences with our Service. We occasionally
						publish such content. When we publish this content, we
						may identify our users by their first name , last name
						,Company name, Owner or Tenant,Buyer,Seller and may also
						indicate their serving city. We obtain the user’s
						consent prior to posting his or her name along with the
						testimonial. We may post user feedback on the website
						from time to time. We will share your feedback with your
						first name , last name ,Company name, Owner or Tenant
						,Buyer, Seller and serving cities.
					</p>
					<p>
						{capitalizeFirstLetter(getHostName())}.com website and
						Mobile Application may contain links to third party
						websites. When you click on a link to any other website,
						We have no control over, do not review, and cannot be
						responsible for, these outside websites or their
						content. Please be aware that the terms of this Privacy
						Policy do not apply to these outside websites or
						content, or to any collection of your Personal Data
						after you click on links to such outside websites.
					</p>
					<p>
						You may change any of your Personal information in your
						Account by editing your profile within your Account or
						by sending an e-mail to us . You may request deletion of
						your Personal Data by us, and we will use reasonable
						efforts to honour your request.
					</p>
					<p>
						{capitalizeFirstLetter(getHostName())}.com respects the
						privacy of its users and is committed to its protection.
					</p>
					<p>
						You may address any of complaint, grievances and queries
						to any of the contact details available at our contact
						us page.
					</p>
				</Box>
			</Container>
		</div>
	);
};

export default PrivacyPolicies;
