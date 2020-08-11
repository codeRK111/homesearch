import Box from '@material-ui/core/Box';

import React from 'react';

const Picker = () => {
	const [file, setFile] = React.useState('');
	const handleChange = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};
	return (
		<Box display="flex" flexDirection="column">
			<input type="file" onChange={handleChange} />
			{file && <img src={file} height="300px" width="500px" />}
		</Box>
	);
};

export default Picker;
