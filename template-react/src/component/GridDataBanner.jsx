import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalWebView from "./ModalWebView";
import { BASE_URL, getApiUrlFile } from "../utils/apiConfig";
import ReactSwitch from "react-switch";
import { COLOR_PRIMARY } from "../utils/constant";
import { fetchData, postData, sendData } from "../api/ApiServices";
import { goto } from "../utils/navigation";
import { useNavigation } from "../utils/useNavigation";
import { Modal } from "react-bootstrap";
import Paging from "./part/Paging";
import ImageModal from "./ImageModal";

function DataGridBanner({
	data,
	visibleColumns,
	customHeaderNames,
	currentPage,
	itemsPerPage,
	setCurrentPage,
	type,
	keyColumns,
}) {
	const [showModal, setShowModal] = React.useState(false);
	const navigate = useNavigation();

	const [toggleStates, setToggleStates] = useState({});
	useEffect(() => {
		console.log("data", data);
		setToggleStates((prevStates) => {
			const newStates = {};
			data.forEach((rowData) => {
				newStates[rowData[keyColumns.id]] =
					rowData[keyColumns.status] === "Aktif";
			});
			return newStates;
		});
	}, [data]);

	const [selectedImage, setSelectedImage] = useState("");

	const handleImageClick = (imageUrl) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	const handleToggle = (id) => {
		setToggleStates((prevStates) => ({ ...prevStates, [id]: !prevStates[id] }));
		const status = toggleStates[id] ? "Tidak Aktif" : "Aktif";

		console.log(data[id]);
		data.map((item) => {
			if (item[keyColumns.id] === id) {
				item[keyColumns.status] = status;
			}
		});
		postData(
			"setStatus" + keyColumns.identifier,
			{ params: { id, user: "admin" } },
			"non-array"
		);
	};

	return (
		<div className="mt-4">
			<div className="table-responsive">
				<table className="table table-hover table-bordered table-condensed table-striped grid">
					<thead>
						<tr>
							<th style={{ width: "10px" }}>No</th>
							<th style={{ width: "500px" }}>Name</th>
							<th style={{ width: "400px" }}>Image</th>
							{customHeaderNames.map((header, index) => (
								<th key={index}>{header}</th>
							))}
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{data.map((rowData, index) => (
							<tr key={index}>
								<td>{rowData["rownum"]}</td>
								<td>{rowData["ban_nama"]}</td>
								<td>
									<img
										src={getApiUrlFile(rowData["ban_gambar"])}
										alt={`Image ${index + 1}`}
										style={{
											width: "200px",
											cursor: "pointer",
											borderRadius: "10px",
										}}
										onClick={() =>
											handleImageClick(getApiUrlFile(rowData["ban_gambar"]))
										}
									/>
								</td>
								{visibleColumns.map((columnName) => (
									<td key={columnName}>{rowData[columnName]}</td>
								))}
								<td style={{ textAlign: "center" }}>
									<a
										style={{ cursor: "pointer" }}
										onClick={() =>
											navigate("edit-" + type, {
												state: {
													id: rowData[keyColumns.id],
													page: currentPage,
												},
											})
										}
									>
										<i className="fi fi-br-edit color-primary"></i>
									</a>
									&nbsp;&nbsp;
									<ReactSwitch
										onColor={COLOR_PRIMARY}
										width={35}
										height={15}
										checked={toggleStates[rowData[keyColumns.id]] || false}
										onChange={() => handleToggle(rowData[keyColumns.id])}
									/>
								</td>
							</tr>
						))}
						{data.length === 0 && (
							<tr>
								<td colSpan={10}>No data available.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<Paging
				pageSize={itemsPerPage}
				pageCurrent={currentPage}
				totalData={data.length > 0 ? data[0].count : 0}
				navigation={setCurrentPage}
			/>

			<ImageModal
				showModal={showModal}
				onHide={() => setShowModal(false)}
				selectedImage={selectedImage}
				size={"l"}
			/>
		</div>
	);
}

export default DataGridBanner;
