import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './customerCount.style';

const CustomerCount = ({ counts }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>{counts.userCounts} +</span>
				<Typography className={classes.text}>
					Happy Customers
				</Typography>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>
					{counts.propertyCounts} +
				</span>
				<Typography className={classes.text}>
					Houses across India
				</Typography>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>{counts.citiesCounts}</span>
				<Typography className={classes.text}>
					Cities in India
				</Typography>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>Rs.12 + Cr</span>
				<Typography align="center" className={classes.text}>
					Savings made on brokerage
				</Typography>
			</div>
		</div>
	);
};

export default CustomerCount;
