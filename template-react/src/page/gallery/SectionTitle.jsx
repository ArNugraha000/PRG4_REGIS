// PartnersSection.js
import React from "react";

const SectionTitle = ({ title, children }) => {
	return (
		<div className="container px-5">
			<h2 className="fw-bold mb-5 color-primary text-center display-6">
				{title}
			</h2>
			{children}
		</div>
	);
};

export default SectionTitle;
