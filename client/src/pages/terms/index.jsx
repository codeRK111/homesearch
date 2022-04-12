import { Box, Container, Typography } from '@material-ui/core';

import Nav from '../../components/v2/pageNav/nav.component';
import React from 'react';
import { getHostName } from '../../utils/render.utils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		'& > p': {
			lineHeight: 1.5,
			fontWeight: 500,
			// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
			letterSpacing: 0.5,
		},
		'& > ol > li': {
			lineHeight: 1.5,
			fontWeight: 500,
			// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
			letterSpacing: 0.5,
			padding: '0.5rem',
		},
	},
}));

const Terms = () => {
	const { wrapper } = useStyles();
	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem" className={wrapper}>
					<Typography variant="h4" component="h1" gutterBottom>
						Terms & Conditions
					</Typography>
					<p>
						Welcome to {getHostName()},The Website and Mobile
						Application,PWA Application is owned by GROVIS
						TECHNOLOGIES PVT LTD, a company incorporated under the
						Indian Companies Act, 1956(Company Registration No.
						129880, CIN- (U74999KA2019PTC129880),and having its
						registered Ofice at #363, 19th Main Road 1st Block
						Rajajinagar,Bangalore-560010
					</p>
					<p>
						This document sets out the Terms and Conditions
						(&quot;Terms&quot;),In using this Website you are deemed
						to have read these terms and Conditions very carefully
						and agreed to the following terms and conditions before
						using the website and Mobile Application ({' '}
						<a href="https://{getHostName()}">
							www.{getHostName()}
						</a>{' '}
						).
					</p>
					<p>
						You acknowledge and agree that by clicking on &quot;I
						accept”, you are indicating that you have read,
						understand and agree to be bound by this Terms and
						Conditions. If you accept or agree to this Terms and
						Conditions on behalf of a nominated company or
						organisation (in these terms, the &quot;USER&quot;), you
						agree that company or organisation will be bound by
						these Terms and Conditions as a customer. You warrant
						and represent that you have full capacity and authority
						to enter into this agreement on behalf of the Customer
						,Company or organisation or Individual.
					</p>
					<p>
						You must be at least 18 years of age to use the Service
						offered by us or using of our website and Mobile
						Application,PWA Application. If you are below 18 years
						of age, you are strictly prohibited from registering on
						our Website and Mobile Application or doing any act,
						which leads us to believe that you are 18 years of age
						or above. By using the Service in any manner, you are
						agreeing to comply with the Terms of Use contained
						herein.
					</p>
					<p>
						If you do not accept these terms, you will not be able
						to use the website, Mobile Application and the services.
						You are advised to print and retain a copy of these
						Terms and Conditions for future reference.
					</p>
					<ol>
						<li>
							You understand that for the purpose of effectively
							using the Website and mobile Application you may
							require that you register in order to use some or
							all of the features and functionalities of the
							Website and Mobile Application, You required to
							provide accurate information including but not
							limited to Your Name ,Company Name, mobile number
							and e-mail id (collectively referred to as “User
							Content”).You represent that you have all rights
							required to provide the information that you
							haveprovided to the Website, including the User
							Content and represent that they are true and
							accurate.
						</li>
						<li>
							First time Users can access the Site for preliminary
							browsing without creating an Account .
							{getHostName()} reserves the right to conduct
							verification and security procedures in respect of
							all information provided by the user. The user
							agrees that entered mobile number at the time of
							registration or sending a query message will be
							mandatory verification process by sending a mobile
							number verification codes on his/her mobile
						</li>
						<li>
							Multiple profiles of the same person/Company are not
							allowed on our Website and in Mobile Application. We
							reserve the right to deactivate all multiple
							profiles.
						</li>
						<li>
							{getHostName()} website and mobile application
							enables the user to connect with independent third
							party Warehouses /Owners Warehouses/ Consultants
							warehouse, warehouse designing consultants and
							offering leasing of different kinds of warehouses
							listed on the Website and Mobile Application.
						</li>
						<li>
							The {getHostName()}w ebsite and mobile application
							allows registered users to perform below activities.{' '}
							<br />
							A- List His/Her residential property for Sale/Rent
							that they own/control and make it available to
							costomers. <br />
							B- Access the Website and mobile Application to
							search for available property in Pan India for
							sale/Rent. <br />
							C- Search and access Projects for available in Pan
							India for sale/Rent.
						</li>
						<li>
							The Service shall not be used to send or receive any
							message, which is offensive on moral, religious,
							racial or political grounds or of an abusive,
							indecent, obscene, defamatory or menacing nature.
						</li>
						<li>
							To protect the secrecy of his user Identification
							and/or password the User shall take all such
							measures as may be necessary (including but without
							limiting to changing his password from time to time
							and shall not reveal the same to any other
							person(s).The User shall immediately notify to
							Company of any un-authorized use of the User&#39;s
							account or any other breach of security known to the
							User.
						</li>
						<li>
							All property and projects listings for sale/Rent on
							the {getHostName()} are the sole responsibility of
							the user&#39;s who may be the owner or a property
							manager or duly authorized property manager or agent
							of the owner, user are solely responsible for
							ensuring the accuracy of any property descriptions,
							and are solely responsible for verifying the
							accuracy of such descriptions. Company is not
							responsible for any damage or loss.
						</li>
						<li>
							You agree that You shall not host, display, upload,
							modify, publish, transmit, update or share any
							information on the Site, that Belongs to another
							person and to which you do not have any right to.
						</li>
						<li>
							User are solely responsible for the Content that
							they publish or display (hereinafter referred to as
							&quot;Post Property&quot;) on the Website or
							transmit to other Members. We reserve the right to
							verify the authenticity of Content posted on the
							Website and in mobile application.
						</li>
						<li>
							You agree that the Content that you posted or submit
							to {getHostName()} may be redistributed through the
							Internet and other media channels like
							Facebook,Twitter,Google..etc, and may be viewed by
							the general public.
						</li>
						<li>
							{getHostName()} is not liable for any losses or
							damages caused by: (i) the act, default or omission
							of a user&#39;s, (ii) failure to observe any of the
							rules relating to property under applicable
							conditions; (iii) acts of God, public enemies,
							public authorities, war, riots, strikes, labor
							disputes, shortages, weather conditions , force
							majeure, mechanical delay or failure of equipment.
						</li>
						<li>
							{getHostName()} is only a platform for the
							advertising of different kinds of
							Projects/Properties on Rent/Sale, Any contractual or
							agreements / deals / transactions / negotiations are
							agreed to between the users .{getHostName()} is not
							responsible for any breach of any contract concluded
							by any of the user in any manner.
						</li>
						<li>
							{getHostName()} may from time to time add, modify,
							suspend or cease (temporarily or permanently) the
							provision of any element of the Services without any
							notice to the user.
						</li>
						<li>
							The User shall not use the Service for any unlawful
							purpose including without limitation criminal
							purposes. We will investigate and take appropriate
							legal action in its sole discretion against anyone
							who violates this Agreement, including without
							limitation.
						</li>
						<li>
							You agree that You shall not abuse Verbal, physical,
							written or any other of {getHostName()} users,
							employees, members, or officers may result in
							immediate account termination including legal action
							against you.
						</li>
						<li>
							You agree that You have no right to make any copies
							of the whole or part of the Website,Mobile
							Application or any of the content therein.
						</li>
						<li>
							The Company may at its sole discretion and without
							assigning any reason whatsoever at any time
							deactivate or/and suspend the User’s access to
							{getHostName()} and/or the Services without notice
							to carry out system maintenance or/and upgrading
							or/and testing or/and repairs or/and other related
							work.
						</li>
						<li>
							{getHostName()} does not guarantee that any content
							postings, messages, text, files, photos, comments,
							images, or any such material (&quot;Content&quot;)
							on our Website and mobile Application will be free
							from any bugs, viruses, Trojans or other harmful
							code or communications that may have contaminating
							or destructive elements. Any Content may be
							downloaded/ used by you solely at your own risk and
							discretion. Company shall not be liable for any harm
							whatsoever, caused to your computer system or loss
							of any data resulting from the download of such
							Content. It shall be your responsibility to
							implement appropriate IT security safeguards
							(including anti- virus and other security checks) on
							your computer, laptop, mobile, tablet or any other
							device connecting you to our Website/Mobile
							Application to satisfy your requirements as to the
							safety and reliability of the Content.
						</li>
						<li>
							{getHostName()} may make changes to the Website,
							Mobile Application and Services or modify these
							Terms, including the Service Fees, without prior
							notice, from time to time. {getHostName()} will
							treat your use as acceptance of the amended terms.
							If the modified Terms are not acceptable to you,
							your only choice is to stop using the Website,
							Mobile Application and Services.
						</li>
						<li>
							{getHostName()} offers a multiple plans of Services
							which the User may subscribe <br />
							A. The plan subscription fee paid by the User is
							non-refundable at any circumstances. <br />
							B. {getHostName()} reserves the right to revise the
							fee of any subscription plan without notice to the
							User at any time.
						</li>
						<li>
							If there is any dispute about or involving the
							Website ,Mobile Application and/or the Service, by
							using the Website and services, you unconditionally
							agree that all such disputes and/or differences will
							be governed by the laws of India and shall be
							subject to the exclusive jurisdiction of the
							Competent Courts in Bangalore,Karnataka, India only.
						</li>
						<li>
							{getHostName()} is only a platform for the
							advertising of different kinds of
							Projects/Properties on Rent/Sale. The Users are
							aware about the rules and regulations in relation to
							the Real Estate Regulatory Authority (RERA) of the
							concerned state in India. Its the responsibility of
							the Users periodically visit the concerned RERA
							website for updates and information in relation to
							any property listed on the Site,The User are solely
							responsible for prior to finalizing any deal or
							transaction.{getHostName()} not taking any
							responsibity.
						</li>
						<li>
							{getHostName()} respects the privacy of its users
							and is committed to its protection. Read the Privacy
							Policy.
						</li>
					</ol>
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

export default Terms;
