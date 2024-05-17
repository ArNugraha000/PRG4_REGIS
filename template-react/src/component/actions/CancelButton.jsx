import React from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "../../utils/useNavigation";

const CancelButton = ({ link }) => {
	const navigate = useNavigation();
	return (
		<button
			onClick={() =>
				navigate(link.pathname, {
					state: link.state,
				})
			}
			className="btn btn-secondary me-2"
		>
			Cancel
		</button>
	);
};

export default CancelButton;
