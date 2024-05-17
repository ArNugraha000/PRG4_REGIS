import React from "react";
import { Link } from "react-router-dom";

const AddButton = ({ link, text }) => {
	return (
		<Link to={link} className="btn btn-primary">
			<i className="fa fa-plus" />
			{" " + text}
		</Link>
	);
};

export default AddButton;
