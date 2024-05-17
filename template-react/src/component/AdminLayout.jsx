import React from "react";
import Header from "./backbone/Header";
import SideBar from "./backbone/SideBar";
import Container from "./backbone/Container";

const AdminLayout = ({ children }) => {
	return (
		<>
			<Header />
			<div style={{ marginTop: "70px" }}></div>
			<div className="d-flex flex-row">
				<SideBar />
				<Container>{children}</Container>
			</div>
		</>
	);
};

export default AdminLayout;
