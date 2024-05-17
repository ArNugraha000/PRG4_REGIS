import React, { useEffect } from "react";
import { fetchDataAndSetState } from "../../api/ApiServices";
import { Link } from "react-router-dom";
import { getApiUrlFile } from "../../utils/apiConfig";
import { useNavigation } from "../../utils/useNavigation";
import { getUrlImage } from "../../utils/helper";

const Card = ({ art_id, art_judul_artikel, art_sampul }) => {
	const navigate = useNavigation();
	return (
		<div
			className="col-lg-3 mb-4"
			onClick={() => {
				navigate("article-detail", {
					state: { id: art_id },
				});
			}}
			style={{ cursor: "pointer" }}
		>
			<div className="card shadow">
				<div
					className="img-fluid rounded"
					style={{
						backgroundImage: `url(${getUrlImage(
							encodeURIComponent(art_sampul),
							"no-image.png"
						)})`,
						width: "100%",
						height: "200px",
						backgroundSize: "cover",
						borderRadius: "20px",
					}}
				></div>

				<div className="card-body">
					<p className="article-title">{art_judul_artikel}</p>
				</div>
			</div>
		</div>
	);
};

const CardArticle = () => {
	const data = [
		{
			art_id: 19,
			art_judul_artikel:
				"Pertama di Dunia, Meister Otomotif ASTRAtech Usung Kualifikasi Jerman Terbaru",
			art_sampul: "MOB_202442285447Foto-1-wisuda-ke-24.jpg",
			art_tanggal_rilis: "2024-04-22T08:55:01.03",
		},
		{
			art_id: 10,
			art_judul_artikel:
				"Gelar Wisuda ke-XXIV, ASTRAtech Hadirkan SDM Unggul Mampu Kembangkan Teknologi Industri",
			art_sampul: "MOB_2024314105334Foto-1-wisuda-ke-24.jpg",
			art_tanggal_rilis: null,
		},
		{
			art_id: 9,
			art_judul_artikel:
				"Pertama di Dunia, Meister Otomotif ASTRAtech Usung Kualifikasi Jerman Terbaru",
			art_sampul: "MOB_2024314104820Foto-1.jpg",
			art_tanggal_rilis: null,
		},
		{
			art_id: 8,
			art_judul_artikel:
				"Cetak SDM Kompeten di Era Digital, ASTRAtech Luncurkan Program Sarjana Terapan Software Engineering",
			art_sampul: "MOB_2024314104942image vr.png",
			art_tanggal_rilis: "2024-02-27T00:00:00",
		},
	];

	return (
		<div className="row mb-3">
			{data.map((content, index) => (
				<Card key={index} {...content} />
			))}
		</div>
	);
};

export default CardArticle;
