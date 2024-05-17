import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/apiConfig";
import Loading from "./Loading";
import ReactSwitch from "react-switch";
import Paging from "./part/Paging";
import ModalWebView from "./ModalWebView";
import { useNavigation } from "../utils/useNavigation";
import { COLOR_PRIMARY } from "../utils/constant";
import { postData } from "../api/ApiServices";

function DataGrid({
	data,
	visibleColumns,
	customHeaderNames,
	currentPage,
	itemsPerPage,
	setCurrentPage,
	type,
	keyColumns,
	setData,
}) {
	const [showModal, setShowModal] = React.useState(false);
	const handleShowModal = (id) => {
		setShowModal(!showModal);
		setURL(`${BASE_URL}/${type}-detail/${id}`);
	};
	const handleCloseModal = () => setShowModal(false);
	const navigate = useNavigation();

	const [toggleStates, setToggleStates] = useState({});

	const [loading, setLoading] = React.useState(true);
	useEffect(() => {
		console.log("data", data);
		setToggleStates((prevStates) => {
			const newStates = {};
			data.forEach((rowData) => {
				newStates[rowData[keyColumns.id]] =
					rowData[keyColumns.status] === "Aktif";
			});
			setLoading(false);
			return newStates;
		});
	}, [data, keyColumns]);

	const handleToggle = (id) => {
		setToggleStates((prevStates) => ({ ...prevStates, [id]: !prevStates[id] }));
		const status = toggleStates[id] ? "Tidak Aktif" : "Aktif";

		console.log("data[id]", data);

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

	const [url, setURL] = React.useState("");

	if (loading) return <Loading />;

	return (
		<div className="mt-4">
			<div className="table-responsive">
				<table className="table table-hover table-bordered table-condensed table-striped grid">
					<thead>
						<tr>
							<th style={{ width: "10px" }}>No</th>
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
									{type !== "user" && (
										<a
											style={{ cursor: "pointer" }}
											onClick={() => handleShowModal(rowData[keyColumns.id])}
										>
											<i className="fi fi-br-list color-primary"></i>
										</a>
									)}
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
			<ModalWebView
				show={showModal}
				handleClose={handleCloseModal}
				title={keyColumns.identifier}
				url={url}
			/>
		</div>
	);
}

export default DataGrid;
