import React, { useEffect, useState } from "react";
import { getUrlImage } from "../utils/helper";
import { fetchDataAndSetState } from "../api/ApiServices";
import { useLocation, useParams } from "react-router-dom";
import { useNavigation } from "../utils/useNavigation";
import Loading from "../component/Loading";
import Paging from "../component/part/Paging";

const Search = () => {
	const { id } = useParams();
	const [data, setData] = React.useState([]);
	const navigate = useNavigation();
	const [loading, setLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 5;
	useEffect(() => {
		console.log("text", id);
		fetchDataAndSetState("getDataSearch", setData, {
			params: {
				page: currentPage,
				text: encodeURIComponent(id),
				total: ITEMS_PER_PAGE,
			},
		}).then(() => setLoading(false));
	}, [currentPage]);

	const handleSetCurrentPage = (page) => {
		setCurrentPage(page);
	};

	const handleClick = (type, id) => {
		const path =
			type === "Article"
				? "article-detail"
				: type === "Course"
				? "course-detail"
				: "product-detail";
		navigate(path, { state: { id: id } });
	};

	if (loading) return <Loading />;

	return (
		<div className="container p-5">
			<p className="fw-bold">Search : {id}</p>
			{data.map((content, index) => (
				<div
					key={index}
					onClick={() => handleClick(content.type, content.id)}
					style={{ cursor: "pointer" }}
				>
					<div className="d-flex">
						<div className="mr-5">
							<img
								style={{ height: "auto", width: "125px", borderRadius: 10 }}
								src={getUrlImage(
									encodeURIComponent(content.sampul),
									"no-image.png"
								)}
							/>
						</div>
						<div className="ms-3 w-100">
							<h6>
								[{content.type}] : {content.title}
							</h6>
							<div
								style={{ textAlign: "justify" }}
								className="search-title"
								dangerouslySetInnerHTML={{
									__html: content.description,
								}}
							></div>
						</div>
					</div>
					<hr className="mx-auto" style={{ width: "100%" }} />
				</div>
			))}
			{data.length === 0 && (
				<tr>
					<td colSpan={10}>No data available.</td>
				</tr>
			)}
			<Paging
				pageSize={ITEMS_PER_PAGE}
				pageCurrent={currentPage}
				totalData={data.length > 0 ? data[0].count : 0}
				navigation={handleSetCurrentPage}
			/>
		</div>
	);
};

export default Search;
