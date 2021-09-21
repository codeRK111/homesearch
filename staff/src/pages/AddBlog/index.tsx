import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Box, Grid, TextField, Typography } from '@material-ui/core';

import { Button } from '../../components/UI/Button';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import React from 'react';
import useStyles from './blog.style';

const AddBlogPage = () => {
	const style = useStyles();

	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	return (
		<Box className={style.wrapper}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h5">Add Blog</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField variant="filled" fullWidth label="Title" />
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="filled"
						fullWidth
						label="Short Description"
					/>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Box mt="2rem" height={250}>
					<Editor
						placeholder="Enter Description"
						editorState={editorState}
						onEditorStateChange={setEditorState}
						wrapperClassName={style.editorWrapper}
						editorClassName={style.editor}
						toolbarStyle={{ border: '1px solid #000000' }}
					/>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box mt="2rem">
					<Button variant="contained" color="primary">
						Submit
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

export default AddBlogPage;
