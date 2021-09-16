import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

interface ITrimText {
	text: string;
	num?: number;
}

const useStyles = makeStyles((theme) => ({
	button: {
		border: 'none',
		color: 'blue',
		textDecoration: 'underline',
		cursor: 'pointer',
	},
}));

const TrimText: React.FC<ITrimText> = ({ text, num = 200 }) => {
	const style = useStyles();

	const [full, setFull] = useState(false);

	// Callbacks
	const toggleState = () => {
		setFull(!full);
	};

	// render
	const renderText = () => {
		if (full) {
			return (
				<span>
					{text}
					<button className={style.button} onClick={toggleState}>
						View Less...
					</button>
				</span>
			);
		} else {
			return (
				<span>
					{`${text.slice(0, num)}`}
					<button className={style.button} onClick={toggleState}>
						View More...
					</button>
				</span>
			);
		}
	};
	return <>{text.length <= num ? text : renderText()}</>;
};

export default TrimText;
