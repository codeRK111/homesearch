import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'flex-start',
			flexWrap: 'wrap',
			listStyle: 'none',
			padding: theme.spacing(0.5),
			margin: 0,
		},
		chip: {
			margin: theme.spacing(0.5),
		},
	})
);

interface IBlogTags {
	tags: string[];
	addTags: (value: string) => void;
	removeTags: (value: string) => void;
}

export default function BlogTags({ tags, addTags, removeTags }: IBlogTags) {
	const classes = useStyles();

	const [tagName, setTagName] = useState('');

	const handleDelete = (chipToDelete: string) => () => {
		removeTags(chipToDelete);
	};
	const handleKeyUpEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			addTags(tagName);
			setTagName('');
		}
	};

	return (
		<Paper component="ul" className={classes.root}>
			<TextField
				variant="filled"
				label="Add Tag"
				value={tagName}
				onChange={(e) => setTagName(e.target.value)}
				onKeyUp={handleKeyUpEvent}
			/>
			{tags.map((data, i) => {
				return (
					<li key={i}>
						<Chip
							label={data}
							onDelete={handleDelete(data)}
							className={classes.chip}
						/>
					</li>
				);
			})}
		</Paper>
	);
}
