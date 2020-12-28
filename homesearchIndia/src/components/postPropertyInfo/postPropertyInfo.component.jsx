import { Box, Grid, Typography } from '@material-ui/core';

import React from 'react';
import clsx from 'clsx';
import useStyles from './postPropertyInfo.styles';

const PostPropertyInfo = ({ text, disable, buttons, value, onChange }) => {
	const classes = useStyles(disable);
	return (
		<Box
			width="100%"
			display="flex"
			flexDirection="column"
			alignItems="center"
			mt="1rem"
		>
			<Typography className={classes.title}>{text}</Typography>
			<Box mt="1rem" className={classes.fullWidth}>
				<Grid container spacing={3}>
					{buttons.map((c, i) => (
						<Grid
							item
							md={12 / buttons.length}
							className={classes.center}
						>
							<Box
								key={i}
								className={clsx({
									[classes.buttonWrapper]: value !== c.name,
									[classes.selectedButton]: value === c.name,
								})}
								onClick={() => {
									if (!disable) {
										onChange(c.name);
									}
								}}
							>
								<Box
									display="flex"
									alignItems="center"
									width="100%"
								>
									<Box
										className={clsx({
											[classes.disableIcon]: disable,
											[classes.icon]: !disable,
										})}
									>
										{c.icon}
									</Box>
									<Box
										className={clsx({
											[classes.disable]: disable,
										})}
									>
										{c.label}
									</Box>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default PostPropertyInfo;
