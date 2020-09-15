import { createSelector } from 'reselect';

const selectBuilder = (state) => state.builder;

export const selectAddBuilderLoading = createSelector(
	[selectBuilder],
	(u) => u.addBuilderLoading
);

export const selectUpdateBuilderLoading = createSelector(
	[selectBuilder],
	(u) => u.updateBuilderLoading
);

export const selectFetchBuildersLoading = createSelector(
	[selectBuilder],
	(u) => u.fetchBuildersLoading
);
export const selectFetchBuilderInfoLoading = createSelector(
	[selectBuilder],
	(u) => u.fetchBuilderInfoLoading
);
export const selectBuilders = createSelector(
	[selectBuilder],
	(u) => u.builders
);
