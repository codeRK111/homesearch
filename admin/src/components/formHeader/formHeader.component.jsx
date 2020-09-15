import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
	formHeader: {
		backgroundColor: '#CCCCCC',
		padding: '0.5rem',
	},
});

const FormHeader = ({ text }) => {
	const classes = useStyles();
	return <h3 className={classes.formHeader}>{text}</h3>;
};

FormHeader.protoTypes = {
	text: PropTypes.string.isRequired,
};

export default FormHeader;
