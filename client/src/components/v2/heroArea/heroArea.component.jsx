import React from 'react';
import agentIcon from '../../../assets/icons/agent.svg';
import clsx from 'clsx';
import loanIcon from '../../../assets/icons/loan.svg';
import newsIcon from '../../../assets/icons/news.svg';
import searchIcon from '../../../assets/search.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './heroArea.style';
import valuationIcon from '../../../assets/icons/valuation.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';

const HeroArea = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div>
			<div className={classes.wrapper}>
				<div>
					<div className={classes.tabWrapper}>
						<span
							className={clsx(
								classes.tabText,
								classes.mr,
								classes.selected
							)}
						>
							Project
						</span>
						<span className={clsx(classes.tabText, classes.mr)}>
							Resale
						</span>
						<span className={clsx(classes.tabText)}>Rent</span>
					</div>
					<div className={classes.searchWrapper}>
						<input
							type="text"
							placeholder="Search For Locality, City, project Or Builder"
						/>
						<img
							src={searchIcon}
							alt=""
							className={classes.svgWrapper}
						/>
					</div>
				</div>
			</div>
			<div className={classes.whatsAppWrapper}>
				<div className={classes.whatsappShadow}>
					<img
						src={whatsappIcon}
						alt=""
						className={classes.whatsappIcon}
					/>
				</div>
			</div>
			<div className={classes.iconsContainer}>
				<div className={classes.iconsWrapper}>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={valuationIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>
							Property Valuation
						</p>
					</div>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={agentIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>Find Agent</p>
					</div>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={loanIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>Loan</p>
					</div>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={newsIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>News</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroArea;
