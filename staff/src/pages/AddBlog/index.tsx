import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
	Box,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { EditorState, convertToRaw } from 'draft-js';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { BlogCategory } from '../../model/blog.interface';
import BlogTags from './tags';
import { Button } from '../../components/UI/Button';
import { Editor } from 'react-draft-wysiwyg';
import { asyncAddBlog } from '../../API/blog';
import draftToHtml from 'draftjs-to-html';
import useStyles from './blog.style';

const AddBlogPage = () => {
	const style = useStyles();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// State
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [generalInfo, setGeneralInfo] = useState({
		title: '',
		shortDesc: '',
		author: '',
		category: '',
	});
	const [tags, setTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [photo, setPhoto] = useState<File | null>(null);

	// Callbacks
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPhoto(e.target.files[0]);
		}
	};
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGeneralInfo((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		setGeneralInfo((prevState) => ({
			...prevState,
			category: e.target.value as string,
		}));
	};
	const addTag = (tag: string) => {
		setTags([...tags, tag]);
	};
	const removeTag = (tag: string) => {
		setTags(tags.filter((c) => c !== tag));
	};

	const addBlog = async () => {
		try {
			const description = draftToHtml(
				convertToRaw(editorState.getCurrentContent())
			);
			if (
				!generalInfo.title ||
				!generalInfo.shortDesc ||
				!description ||
				!generalInfo.category ||
				!generalInfo.author
			)
				return;
			const formData = new FormData();
			formData.append('title', generalInfo.title);
			formData.append('shortDesc', generalInfo.shortDesc);
			formData.append('category', generalInfo.category);
			formData.append('author', generalInfo.author);
			formData.append('description', description);
			tags.forEach((c) => {
				formData.append('tags', c);
			});
			if (photo) {
				formData.append('photo', photo);
			}
			setLoading(true);
			await asyncAddBlog(formData);
			setLoading(false);
			setPhoto(null);
			setTags([]);
			setGeneralInfo({
				title: '',
				shortDesc: '',
				author: '',
				category: '',
			});
			setEditorState(EditorState.createEmpty());
			setSnackbar({
				open: true,
				message: 'Lead Posted successfully',
				severity: 'success',
			});
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	return (
		<Box className={style.wrapper}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h5">Add Blog</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="filled"
						fullWidth
						label="Title"
						value={generalInfo.title}
						name="title"
						onChange={onInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="filled"
						fullWidth
						label="Author"
						value={generalInfo.author}
						name="author"
						onChange={onInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="filled" fullWidth>
						<InputLabel id="demo-simple-select-filled-label">
							Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-filled-label"
							id="demo-simple-select-filled"
							value={generalInfo.category}
							name="category"
							onChange={onSelectChange}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={BlogCategory.Builder}>
								Builder
							</MenuItem>
							<MenuItem value={BlogCategory.Project}>
								Project
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="filled"
						fullWidth
						label="Short Description"
						value={generalInfo.shortDesc}
						name="shortDesc"
						onChange={onInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<BlogTags
						tags={tags}
						addTags={addTag}
						removeTags={removeTag}
					/>
				</Grid>

				<Grid item xs={12}>
					<Box height={250}>
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
					<input
						type="file"
						onChange={onFileChange}
						placeholder="Photo"
					/>
				</Grid>
				<Grid item xs={12}>
					<Box>
						<Button
							variant="contained"
							color="primary"
							onClick={addBlog}
							disabled={loading}
							endIcon={
								loading ? (
									<CircularProgress
										size={20}
										color="inherit"
									/>
								) : (
									<></>
								)
							}
						>
							Submit
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddBlogPage;
