import './hamburger.css';

import React, { useEffect, useRef } from 'react';

import { menu } from '../../../utils/statc';

const Hamburger = () => {
	const hamburger = useRef(null);

	useEffect(() => {
		const navLinks = document.querySelector('.nav-links');
		const div = hamburger.current;

		div.addEventListener('click', () => {
			navLinks.classList.toggle('open');
		});

		return () => {
			div.removeEventListener('scroll', () => {
				navLinks.classList.toggle('open');
			});
		};
	}, []);
	return (
		<div>
			<nav>
				<div className="hamburger" ref={hamburger}>
					<img src={menu} alt="Menu" className={'menuIcon'} />
				</div>
				<ul className="nav-links"></ul>
			</nav>
		</div>
	);
};

export default Hamburger;
