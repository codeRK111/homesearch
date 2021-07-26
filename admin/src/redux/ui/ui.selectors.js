import { createSelector } from 'reselect';

const selectUI = (state) => state.ui;

export const snackbarDetails = createSelector([selectUI], (c) => c.snackbar);

// Select Errors
