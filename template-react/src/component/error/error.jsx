// SomethingWentWrongPage.js

import React from "react";
import ErrorImage from "../../assets/error.jpg";

const ErrorPage = () => {
	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center">
					<img
						src={ErrorImage}
						alt="Error Illustration"
						className="img-fluid mb-4"
					/>
					<h1 className="display-4 mb-3">Oops!</h1>
					<p className="lead">
						Something went wrong. Don't worry, we're on it!
					</p>
					<p className="mb-4">Our team will fix this issue.</p>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
