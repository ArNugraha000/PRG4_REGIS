import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../component/Loading";
import { fetchDataAndSetState } from "../../../api/ApiServices";
import DataGridBanner from "../../../component/GridDataBanner";
import SearchBar from "../../../component/form/SearchBar";
import {
	handleKeyDown,
	handleSearch,
	handleSetCurrentPage,
} from "../../../utils/helper";
import { useLocation } from "react-router-dom";

const MasterBanner = () => {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const location = useLocation();
	const page = location.state?.page ?? 1;
	const [currentPage, setCurrentPage] = useState(page);
	const ITEMS_PER_PAGE = 10;

	const searchQuery = useRef();
	const searchFilterSort = useRef();
	const searchFilterStatus = useRef();

	const dataFilterSort = [
		{ Value: "ban_nama asc", Text: "Banner Name [↑]" },
		{ Value: "ban_nama desc", Text: "Banner Name [↓]" },
	];
	const dataFilterStatus = [
		{ Value: "", Text: "All Status" },
		{ Value: "Aktif", Text: "Aktif" },
		{ Value: "Tidak Aktif", Text: "Tidak Aktif" },
	];

	const [currentFilter, setCurrentFilter] = useState({
		jenis: "MASTER",
		page: currentPage,
		query: "",
		sort: "ban_nama asc",
		status: "",
		total: ITEMS_PER_PAGE,
	});

	useEffect(() => {
		fetchDataAndSetState("getDataBanner", setData, {
			params: currentFilter,
		}).then(() => {
			setLoading(false);
		});
	}, [currentFilter]);

	const _handleSetCurrentPage = handleSetCurrentPage(
		setCurrentPage,
		setLoading,
		setCurrentFilter
	);
	const _handleSearch = handleSearch(
		setLoading,
		setCurrentFilter,
		searchQuery,
		searchFilterSort,
		searchFilterStatus
	);
	const _handleKeyDown = handleKeyDown(_handleSearch);

	if (loading) return <Loading />;

	return (
		<>
			<div className="d-flex flex-column">
				<SearchBar
					searchQuery={searchQuery}
					searchFilterSort={searchFilterSort}
					searchFilterStatus={searchFilterStatus}
					handleKeyDown={_handleKeyDown}
					handleSearch={_handleSearch}
					dataFilterSort={dataFilterSort}
					dataFilterStatus={dataFilterStatus}
					to={"/add-banner"}
					defaultSorting="ban_nama asc"
					defaultFilterStatus="Aktif"
				/>
				<div className="mt-3">
					<div className="d-flex flex-column">
						<h5>
							Halaman admin pakai template sudah bisa diubah pake template mas
							yosep
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default MasterBanner;
