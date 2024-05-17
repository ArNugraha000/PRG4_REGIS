import { useEffect, useState } from "react";
import Logo from "../../assets/IMG_Logo.png";
import Cookies from "js-cookie";
import { decryptId } from "../../utils/encryptor";

export default function Header() {
	const [user, setUser] = useState({});
	useEffect(() => {
		const user = Cookies.get("user");
		if (user) {
			const userProfile = decodeURIComponent(user);
			const decrypt = decryptId(userProfile);
			setUser(JSON.parse(decrypt));
		}
	}, []);
	return (
		<div className="d-flex justify-content-between fixed-top border-bottom bg-white">
			<img
				src={Logo}
				alt="Logo AstraTech"
				className="p-3"
				style={{ height: "70px" }}
			/>
			<div className="pe-4 my-auto">
				<div className="d-flex justify-content-end">
					<div className="text-end align-content-center">
						<p className="fw-bold mx-0 my-0">
							{user.nama} ({user.role})
						</p>
						{/* <small className="text-body-secondary">
							Login terakhir: 6 Maret 2024, 10:38 WIB
						</small> */}
					</div>
					{/* <div className="my-auto ms-4 mt-2">
						<p className="h2 p-0 m-0">
							<Icon name="envelope" />
							<span
								className="badge rounded-pill bg-danger position-absolute top-0 end-0"
								style={{
									fontSize: ".3em",
									marginTop: "15px",
									marginRight: "15px",
								}}
							>
								40
							</span>
						</p>
					</div> */}
				</div>
			</div>
		</div>
	);
}
