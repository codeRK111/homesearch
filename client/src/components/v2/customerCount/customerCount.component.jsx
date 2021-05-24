import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './customerCount.style';

const CustomerCount = () => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>18,000 +</span>
				<Typography className={classes.text}>
					Happy Customers
				</Typography>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>24,000 +</span>
				<Typography className={classes.text}>
					Houses across India
				</Typography>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>6</span>
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
