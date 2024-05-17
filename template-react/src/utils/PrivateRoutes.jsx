import React from "react";
import { Route, Redirect } from "react-router-dom";
import { decryptId } from "./encryptor";
import Cookies from "js-cookie";
const user = JSON.parse(decryptId(Cookies.get("user")));
console.log(user);

const PrivateRoute = ({ component: Component, roles, loggedIn, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (!loggedIn) {
				return (
					<Redirect
						to={{ pathname: "/login-page", state: { from: props.location } }}
					/>
				);
			}

			if (roles && roles.indexOf(user.role) === -1) {
				window.location.href = "/403";
			}
			return <Component {...props} />;
		}}
	/>
);

export default PrivateRoute;
