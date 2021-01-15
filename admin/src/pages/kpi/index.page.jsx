import ProjectAdvertisementLeadPage from './projectAdvertisementLead/projectAdvertisementLead.page';
import React from 'react';
import StaffDetailsPage from './projectAdvertisementLead/staffDetails.page';

// import { useHistory } from 'react-router-dom';

const KPI = ({
	match: {
		params: { type, action, details },
	},
}) => {
	// const history = useHistory();
	const renderPage = () => {
		switch (type) {
			case 'project-advertisement':
				switch (action) {
					case 'overview':
						return <ProjectAdvertisementLeadPage />;
					case 'staff-details':
						return <StaffDetailsPage id={details} />;

					default:
						break;
				}
				break;
			case '':
				return;

			default:
				break;
		}
	};
	return <div>{renderPage()}</div>;
};

export default KPI;
