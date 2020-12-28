import { Breadcrumbs, Link, Typography } from '@material-ui/core';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import React from 'react';

const CustomBreadCrumb = ({ routes, currentText }) => {
	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
		>
			{routes.map((c, i) => (
				<Link key={i} color="inherit" href={c.path}>
					{c.label}
				</Link>
			))}

			<Typography color="textPrimary">{currentText}</Typography>
		</Breadcrumbs>
	);
};

CustomBreadCrumb.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			path: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	currentText: PropTypes.string.isRequired,
};

export default CustomBreadCrumb;
