import React,{useState} from 'react';
import {trimStyle} from "./trimText.style";

const TrimText = ({text, num = 200}) => {
	const style = trimStyle();

	const [full,setFull] = useState(false);

	// Callbacks
	const toggleState = () => {
		setFull(!full)
	}

	// render
	const renderText = () => {
		if(full) {
			return <span>{text}
				<button className={style.button} onClick={toggleState}>View Less...</button></span>
		} else {
			return  <span>{`${text.slice(0, num)}`}
				<button className={style.button} onClick={toggleState}>View More...</button></span>
		}
	}
	return <>
		{
			text.length <= num ? text : renderText()
		}
	</>;
};

export default TrimText;