import { createSelector } from 'reselect';

const selectProperty = (state) => state.kra;

export const selectAddProjectAdvertisementLoading = createSelector(
	[selectProperty],
	(c) => c.addProjectAdvertisementLoading
);
export const selectAddProjectAdvertisementLeadLoading = createSelector(
	[selectProperty],
	(c) => c.addProjectAdvertisementLeadLoading
);
export const selectfetchProjectAdvertisementsLoading = createSelector(
	[selectProperty],
	(c) => c.fetchProjectAdvertisementsLoading
);
export const selectfetchProjectAdvertisementLeadsLoading = createSelector(
	[selectProperty],
	(c) => c.fetchProjectAdvertisementLeadsLoading
);
export const selectfetchProjectAdvertisementDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.fetchProjectAdvertisementDetailsLoading
);
export const selectUpdateProjectAdvertisementDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.updateProjectAdvertisementDetailsLoading
);
export const selectDeleteProjectAdvertisementLoading = createSelector(
	[selectProperty],
	(c) => c.deleteProjectAdvertisementLoading
);

// Select Errors
