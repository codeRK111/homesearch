import { Breadcrumbs, Link, Typography } from '@material-ui/core';

import React from 'react';

const Breadcumb = ({ name }) => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" href="/realtors">
				Realtors
			</Link>

			<Typography color="textPrimary">{name}</Typography>
		</Breadcrumbs>
	);
};

export default Breadcumb;
