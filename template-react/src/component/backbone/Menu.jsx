import { Link } from "react-router-dom";
import Icon from "../part/Icon";
import { useEffect } from "react";
import user from "../../utils/user";

let active_menu;
let active_collapse;

const arrMenu = [
	{ head: "Logout", headkey: "logout", link: "/logout", sub: [] },
	{ head: "Beranda", headkey: "beranda", link: "/admin", sub: [] },
	{
		head: "Customer",
		headkey: 1,
		link: "#",
		sub: [
			{
				title: "Data Customer",
				link: "/master-banner",
			},
		],
	},
];

const arrMenuContributor = [
	{ head: "Logout", headkey: "logout", link: "/logout", sub: [] },
	{ head: "Beranda", headkey: "beranda", link: "/admin", sub: [] },
	{
		head: "Master Data",
		headkey: 1,
		link: "#",
		sub: [
			{
				title: "Master Artikel",
				link: "/master-article",
			},
		],
	},
];

function checkIcon(menu) {
	let menuIcon = "angle-down";

	switch (menu) {
		case "Logout":
			menuIcon = "sign-out-alt";
			break;
		case "Beranda":
			menuIcon = "home";
			break;
	}

	return menuIcon;
}

function setActiveMenu(menu) {
	console.log("setActiveMenu", menu);
	active_menu = menu;
}

function setActiveCollapse(id) {
	active_collapse = id;
}

let menuToDisplay;
if (user && user.role) {
	menuToDisplay = user.role === "Admin" ? arrMenu : arrMenuContributor;
} else {
	menuToDisplay = arrMenu;
}

export default function Menu() {
	const activeURL = location.pathname.replace(/\/$/, "");

	useEffect(() => {
		try {
			document.getElementById("spanMenu").innerHTML = active_menu;
			if (active_collapse)
				document.getElementById(active_collapse).classList.add("show");
		} catch {}
	}, [activeURL]);
	return (
		<nav>
			{menuToDisplay.map((menu) => {
				if (activeURL === menu["link"]) setActiveMenu(menu["head"]);
				return (
					<div key={"#menucollapse" + menu["headkey"]}>
						<Link
							className="text-decoration-none text-black fw-bold"
							data-bs-toggle={menu["link"] === "#" ? "collapse" : ""}
							to={
								menu["link"] === "#"
									? "#menucollapse" + menu["headkey"]
									: menu["link"]
							}
							// href={
							// 	menu["link"] === "#"
							// 		? "#menucollapse" + menu["headkey"]
							// 		: menu["link"]
							// }
						>
							<div
								className={
									"w-100 px-3 py-2 d-flex" +
									(activeURL === menu["link"] ? " bg-primary text-white" : "")
								}
							>
								<Icon
									type="Bold"
									name={checkIcon(menu["head"])}
									cssClass="me-2"
									style={{ marginTop: "2px" }}
								/>
								<span>{menu["head"]}</span>
							</div>
						</Link>
						<div className="collapse" id={"menucollapse" + menu["headkey"]}>
							{menu["sub"].map((sub) => {
								if (activeURL === sub["link"]) {
									console.log("activeURL", menu["head"] + " - " + sub["title"]);
									setActiveMenu(menu["head"] + " - " + sub["title"]);
									setActiveCollapse("menucollapse" + menu["headkey"]);
								}
								return (
									<Link
										className="text-decoration-none text-black"
										to={sub["link"]}
										// href={sub["link"]}
										key={"#menucollapse" + menu["headkey"] + sub["link"]}
									>
										<div
											className={
												"w-100 ps-4 pe-3 py-1 d-flex fw-medium" +
												(activeURL === sub["link"]
													? " bg-primary text-white"
													: "")
											}
										>
											<Icon name="minus-small" cssClass="me-2 mt-1" />
											<span>{sub["title"]}</span>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</nav>
	);
}
