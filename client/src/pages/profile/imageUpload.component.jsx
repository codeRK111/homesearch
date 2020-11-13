import { Avatar, Box, Button } from '@material-ui/core';

import React from 'react';
import useStyles from './profile.styles';

const ImageUpload = () => {
	const classes = useStyles();
	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Avatar
				alt="User"
				src={require('../../assets/dummy_user.png')}
				className={classes.avatar}
			/>
			<div className={classes.root}>
				<input
					accept="image/*"
					className={classes.input}
					id="contained-button-file"
					multiple
					type="file"
				/>
				<label htmlFor="contained-button-file">
					<Button
						variant="contained"
						color="primary"
						component="span"
						className={classes.buttonUpload}
					>
						Upload
					</Button>
				</label>
				{/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> */}
			</div>
		</Box>
	);
};

export default ImageUpload;
