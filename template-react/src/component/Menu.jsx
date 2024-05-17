import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const listMenu = [
	{ id: 1, name: "HOME", link: "/" },
	{ id: 3, name: "CUSTOMER", link: "/customer" },
	{ id: 2, name: "LOGIN", link: "/login-page" },
	{ id: 4, name: "PRODUCT & FACILITY", link: "/product" },
	{ id: 5, name: "ARTICLE", link: "/article" },
	{ id: 6, name: "GALLERY", link: "/gallery" },
	{ id: 7, name: "CONTACT", link: "/contact" },
];

const Menu = () => {
	const [expanded, setExpanded] = useState(false);
	const [activeMenu, setActiveMenu] = useState("");

	const location = useLocation();

	useEffect(() => {
		// Mengatur menu yang sedang aktif berdasarkan URL
		const currentPath = location.pathname;
		console.log(currentPath);
		setActiveMenu(currentPath);
	}, [location]);

	const handleToggleClick = () => {
		setExpanded(!expanded);
	};

	const handleMenuClick = () => {
		setExpanded(false);
	};

	return (
		<>
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded={expanded ? "true" : "false"}
				aria-label="Toggle navigation"
				onClick={handleToggleClick}
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div
				className={`collapse navbar-collapse justify-content-center ${
					expanded ? "show" : ""
				}`}
				id="navbarNav"
			>
				<ul className="navbar-nav">
					{listMenu.map((menu) => (
						<li
							key={menu.id}
							className={`nav-item ${menu.link === activeMenu ? "active" : ""}`}
						>
							<Link
								className={`nav-link ${
									menu.link === activeMenu ? "active" : ""
								}`}
								to={menu.link}
								onClick={handleMenuClick}
							>
								{menu.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Menu;
