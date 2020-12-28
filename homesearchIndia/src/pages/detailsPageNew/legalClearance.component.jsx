import { Avatar, Box, Chip, Divider } from '@material-ui/core';

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useStyles from './detailsPage.styles';

const LegalClearance = ({ property }) => {
	const classes = useStyles();
	return (
		<Box p="1rem">
			<Box
				display="flex"
				width="100%"
				alignItems="center"
				mb="1rem"
				mt="1rem"
			>
				<Box pl="0.3rem" pr="0.3rem">
					<h4 className={classes.title}>Legal Clearance</h4>
				</Box>
				<Box flexGrow={1}>
					<Divider />
				</Box>
			</Box>
			<Box
				display="flex"
				flexWrap="wrap"
				// justifyContent="center"
			>
				{property.legalClearance &&
					property.legalClearance
						.filter((b) => b.value)
						.map((c, i) => (
							<Box ml="1rem" key={i} mt="0.5rem">
								<Chip
									variant={c.value ? 'outlined' : 'default'}
									avatar={
										<Avatar
											className={clsx({
												[classes.selected]: c.value,
											})}
										>
											<HomeWorkIcon
												className={clsx(
													classes.avatarIcon,
													{
														[classes.cWhite]:
															c.value,
													}
												)}
											/>
										</Avatar>
									}
									label={c.label}
								/>
							</Box>
						))}
			</Box>
		</Box>
	);
};

LegalClearance.propTypes = {
	property: PropTypes.object.isRequired,
};

export default LegalClearance;
