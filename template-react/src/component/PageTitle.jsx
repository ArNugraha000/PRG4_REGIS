// ProductHeader.js
import React from "react";
import Background3 from "../assets/svg/background-3.png";
import Background2 from "../assets/svg/background-2.png";

const PageTitle = ({ title, backgroundImage, children }) => {
	var bg = "";
	if (backgroundImage === "background3") {
		bg = Background3;
	} else if (backgroundImage === "background2") {
		bg = Background2;
	}
	const headerStyle = {
		backgroundImage: `url('${Background3}')`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center center",
		backgroundSize: "cover",
	};

	return (
		<div style={headerStyle}>
			<div className="container rounded">
				<h1
					className="display-6 header-align py-3 fw-bold px-5"
					style={{ color: "#0059AB" }}
				>
					{title}
				</h1>
				{children}
			</div>
		</div>
	);
};

export default PageTitle;
