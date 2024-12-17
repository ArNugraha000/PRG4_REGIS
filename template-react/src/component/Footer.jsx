import React from "react";
function Footer() {
	return (
		<footer>
			<div
				className="footer"
				style={{
					backgroundColor: "#0059AB",
				}}
			>
				<div className="container">
					<div className="row">
						<div
							className="col-lg-4"
							style={{
								padding: "20px 40px",
								textAlign: "left",
								color: "white",
								fontSize: "15px",
							}}
						>
							<h6 style={{ fontWeight: "bold", marginBottom: 15 }}>
								ASTRA POLYTECHNIC
							</h6>
							<p>
								<b>Cikarang Campus :</b>
								<br />
								Jl. Gaharu Blok F-3 Delta Silicon 2 Lippo Cikarang, Kel. Cibatu,
								Kec. Cikarang Selatan, Bekasi, West Java 17530
							</p>
							<p>
								<b>Sunter Campus : </b>
								<br />
								PT Astra International Tbk. Complex, Building B, Jl. Gaya Motor
								Raya No. 8, Sunter II, Jakarta 14330
							</p>
						</div>
						<div
							className="col-lg-4"
							style={{
								padding: "20px 40px",
								textAlign: "left",
								color: "white",
								fontSize: "15px",
							}}
						>
							<h6 style={{ fontWeight: "bold" }}>SERVICE HOURS</h6>
							<h6>Monday - Friday (08:00 - 16:00 WIB)</h6>
							<br />
							<h6 style={{ fontWeight: "bold" }}>QUICK LINKS</h6>
							<a
								href="https://goo.gl/maps/5VCNFxoCRRUwBF547"
								style={{ textDecoration: "none", color: "white" }}
								target="_blank"
							>
								<h6>- Campus Location</h6>
							</a>
							<a
								href="https://sia.polytechnic.astra.ac.id"
								style={{ textDecoration: "none", color: "white" }}
								target="_blank"
							>
								<h6>- Sistem Informasi Akademik</h6>
							</a>
							<a
								href="Page_Login.aspx"
								style={{ textDecoration: "none", color: "white" }}
								target="_blank"
							>
							</a>
						</div>
						<div
							className="col-lg-4"
							style={{
								padding: "20px 40px",
								textAlign: "left",
								color: "white",
								fontSize: "15px",
							}}
						>
							<h6 style={{ marginBottom: 20 }}>
								<span style={{ fontWeight: "bold" }}>Whatsapp</span> :{" "}
								{import.meta.env.VITE_PHONE}
								<br />
								<span style={{ fontWeight: "bold" }}>Email</span> :
								{" " + import.meta.env.VITE_EMAIL}
								<br />
								<span style={{ fontWeight: "bold" }}>Website</span> :
								https://www.polytechnic.astra.ac.id
							</h6>
							<a
								className="btn-floating btn-md btn-ins waves-effect waves-light"
								style={{ margin: "10px 5px" }}
								role="button"
							>
								<i className="fab fa-instagram" />
							</a>
							<a
								className="btn-floating btn-md btn-yt waves-effect waves-light"
								style={{ margin: "10px 5px" }}
								role="button"
							>
								<i className="fab fa-youtube" />
							</a>
							<a
								className="btn-floating btn-md btn-fb waves-effect waves-light"
								style={{ margin: "10px 5px" }}
								role="button"
							>
								<i className="fab fa-facebook-f" />
							</a>
							<a
								className="btn-floating btn-md btn-tw waves-effect waves-light"
								style={{ margin: "10px 5px" }}
								role="button"
							>
								<i className="fab fa-twitter" />
							</a>
							<a
								className="btn-floating btn-md btn-whatsapp waves-effect waves-light"
								style={{ margin: "10px 5px" }}
								role="button"
							>
								<i className="fab fa-whatsapp" />
							</a>
							<p className="mt-3 mb-0">© 2024 Politeknik Astra</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
