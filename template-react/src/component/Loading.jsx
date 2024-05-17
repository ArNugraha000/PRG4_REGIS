import React from "react";
import {
	GridLoader,
	HashLoader,
	PropagateLoader,
	ScaleLoader,
} from "react-spinners";
import { COLOR_PRIMARY } from "../utils/constant";

const Loading = () => {
	return (
		<div
			style={{
				textAlign: "-webkit-center",
				marginTop: "200px",
				marginBottom: "200px",
			}}
		>
			<HashLoader color={COLOR_PRIMARY} loading={true} />
		</div>
	);
};

export default Loading;
