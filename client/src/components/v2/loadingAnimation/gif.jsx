import React from 'react';
import { logo } from '../../../utils/statc';
import useStyles from './style';

const Gif = () => {
	const style = useStyles();
	return (
		<div>
			<h1>Loading</h1>
			<img
				src={logo}
				alt="Loader"
				style={{
					height: 100,
					width: 100,
				}}
			/>
		</div>
	);
};

export default Gif;
