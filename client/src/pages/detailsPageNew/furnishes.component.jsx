import { Avatar, Box, Chip, Divider } from '@material-ui/core';

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPropertyResources } from '../../redux/property/property.actions';
import { selectFurnishes } from '../../redux/property/property.selectors';
import useStyles from './detailsPage.styles';

const Furnishes = ({ property, furnishes, getPropertyResources }) => {
	const classes = useStyles();
	const isSelected = (id) => {
		const isPresent = property.furnishes.find(
			(c) => (c.id ? c.id : c) === id
		);
		return isPresent ? true : false;
	};
	React.useEffect(() => {
		if (furnishes.length === 0) {
			getPropertyResources((d) => {});
		}
	}, [furnishes, getPropertyResources]);
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
					<h4 className={classes.title}>Furnishes</h4>
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
				{furnishes &&
					furnishes.map((c) => (
						<Box ml="1rem" key={c.id} mt="0.5rem">
							<Chip
								variant={
									isSelected(c.id) ? 'outlined' : 'default'
								}
								avatar={
									<Avatar
										className={clsx({
											[classes.selected]: isSelected(
												c.id
											),
										})}
									>
										<HomeWorkIcon
											className={clsx(
												classes.avatarIcon,
												{
													[classes.cWhite]: isSelected(
														c.id
													),
												}
											)}
										/>
									</Avatar>
								}
								label={c.name}
							/>
						</Box>
					))}
			</Box>
		</Box>
	);
};

Furnishes.propTypes = {
	property: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
	furnishes: selectFurnishes,
});

const mapDispatchToProps = (dispatch) => ({
	getPropertyResources: (callback) =>
		dispatch(getPropertyResources({ callback })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Furnishes);
