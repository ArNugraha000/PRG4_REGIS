// ValidationError.js
import React from "react";

const ValidationError = ({ message }) => {
	return (
		<div className="text-danger" style={{ fontSize: "12px" }}>
			{message}
		</div>
	);
};

export default ValidationError;
