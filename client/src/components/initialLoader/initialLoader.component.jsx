import './initialLoader.css';

import React from 'react';

const InitialLoader = () => {
	return (
		<div id="building">
			<div id="blocks">
				<div className="b" id="b1"></div>
				<div className="b" id="b2"></div>
				<div className="b" id="b3"></div>
				<div className="b" id="b4"></div>
			</div>
		</div>
	);
};

export default InitialLoader;
