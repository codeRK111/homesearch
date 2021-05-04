import React from 'react';
import useStyles from './customerCount.style';

const CustomerCount = () => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>18,000 +</span>
				<span className={classes.text}>Happy Customers</span>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>24,000 +</span>
				<span className={classes.text}>Houses across India</span>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>6</span>
				<span className={classes.text}>Cities in India</span>
			</div>
			<div className={classes.flexWrapper}>
				<span className={classes.number}>Rs.12 + Cr</span>
				<span className={classes.text}>Savings made on brokerage</span>
			</div>
		</div>
	);
};

export default CustomerCount;
