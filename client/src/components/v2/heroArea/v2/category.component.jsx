import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../../../redux/actionTab/actionTab.selectors';
import { setCurrentTab } from '../../../../redux/actionTab/actionTab.actions';
import useStyles from './heroArea.style';

const CategoryComponent = ({ currentTab, setCurrentTab }) => {
	// Styles
	const style = useStyles();

	// Callbacks
	const handleAssetType = (asset) => (e) => {
		setCurrentTab(asset);
	};
	return (
		<div className={style.categoryWrapper}>
			<button
				className={clsx(
					style.categoryButton,
					currentTab === 'project' && style.categorySelectedButton
				)}
				onClick={handleAssetType('project')}
			>
				Project
			</button>
			<button
				className={clsx(
					style.categoryButton,
					currentTab === 'sale' && style.categorySelectedButton
				)}
				onClick={handleAssetType('sale')}
			>
				Resale
			</button>
			<button
				className={clsx(
					style.categoryButton,
					currentTab === 'rent' && style.categorySelectedButton
				)}
				onClick={handleAssetType('rent')}
			>
				Rent
			</button>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentTab: (tab) => dispatch(setCurrentTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
