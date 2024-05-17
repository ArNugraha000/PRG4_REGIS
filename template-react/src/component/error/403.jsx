// SomethingWentWrongPage.js

import React from "react";
import Button from "../part/Button";
import AddButton from "../actions/AddButton";
import ForbiddenImage from "../../assets/403.jpg";

const Forbidden = () => {
	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center">
					<img
						src={ForbiddenImage}
						alt="Error Illustration"
						className="img-fluid mb-4"
					/>
					<h1 className="display-4 mb-3">Oops!</h1>
					<p className="lead">
						We are sorry!, but you do not have access to this page or resources
					</p>
					<AddButton link="/login-page" text="Login" />
				</div>
			</div>
		</div>
	);
};

export default Forbidden;
