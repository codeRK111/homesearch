import { agent, loan, news, valuation } from '../../../../utils/statc';

import { Grid } from '@material-ui/core';
import React from 'react';
import builderLogo from '../../../../assets/icons/builder.svg';
import clsx from 'clsx';
import useGlobalStyles from '../../../../common.style';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useParentStyles from '../heroArea.style';
import useStyles from './heroArea.style';
import { useTheme } from '@material-ui/core/styles';

const BottomLinkComponent = () => {
	// Styles
	const style = useStyles();
	const classes = useParentStyles();
	const globalClasses = useGlobalStyles();
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const history = useHistory();

	const gridProps = {};
	if (smallScreen) {
		gridProps.xs = 3;
	} else {
		if (gridProps.xs) {
			delete gridProps.xs;
		}
	}

	const redirectTo = (path) => () => history.push(path);

	return (
		<Grid container spacing={smallScreen ? 3 : 7} justify="center">
			<Grid item {...gridProps}>
				<div className={style.iconWraper}>
					<div className={classes.iconShadow}>
						<img
							src={builderLogo}
							alt=""
							className={classes.svgWrapper}
						/>
					</div>
					<p
						className={clsx(
							globalClasses.textCenter,
							style.iconText
						)}
					>
						Builders
					</p>
				</div>
			</Grid>
			<Grid item {...gridProps}>
				<div
					className={style.iconWraper}
					onClick={redirectTo('/realtors')}
				>
					<div className={classes.iconShadow}>
						<img
							src={agent}
							alt=""
							className={classes.svgWrapper}
						/>
					</div>
					<p
						className={clsx(
							globalClasses.textCenter,
							style.iconText
						)}
					>
						Find Realtors
					</p>
				</div>
			</Grid>
			<Grid item {...gridProps}>
				<div className={style.iconWraper}>
					<div className={classes.iconShadow}>
						<img
							src={valuation}
							alt=""
							className={classes.svgWrapper}
						/>
					</div>
					<p
						className={clsx(
							globalClasses.textCenter,
							style.iconText
						)}
					>
						Property Valuation
					</p>
				</div>
			</Grid>
			<Grid item {...gridProps}>
				<div className={style.iconWraper}>
					<div className={classes.iconShadow}>
						<img src={loan} alt="" className={classes.svgWrapper} />
					</div>
					<p
						className={clsx(
							globalClasses.textCenter,
							style.iconText
						)}
					>
						Loan
					</p>
				</div>
			</Grid>
			<Grid item {...gridProps}>
				<div className={style.iconWraper} onClick={redirectTo('/news')}>
					<div className={classes.iconShadow}>
						<img src={news} alt="" className={classes.svgWrapper} />
					</div>
					<p
						className={clsx(
							globalClasses.textCenter,
							style.iconText
						)}
					>
						News
					</p>
				</div>
			</Grid>
		</Grid>
	);
};

export default BottomLinkComponent;
