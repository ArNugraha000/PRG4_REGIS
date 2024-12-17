import React, { useState } from "react";
import { useNavigation } from "../../utils/useNavigation";
import moment from "moment";
import "moment/locale/id";
import { getUrlImage } from "../../utils/helper";
import { COLOR_PRIMARY } from "../../utils/constant";

const CardEvent = ({ event }) => {
	const navigate = useNavigation();
	const [visibleCourses, setVisibleCourses] = useState(8);

	const loadMore = () => {
		setVisibleCourses((prev) => prev + 4);
	};

	return (
		<div>
			{event.slice(0, visibleCourses).map((data, index) => (
				<div className="row" key={index}>
					<div className="col-12">
						<div className="single-job-items mb-2 shadow rounded-5">
							<div className="job-items">
								<div className="job-tittle">
									<h4 className="color-primary">{data.cou_nama_pelatihan}</h4>
									<sub>
										{moment(data.tra_start_date).format("DD MMMM YYYY")} -{" "}
										{moment(data.tra_end_date).format("DD MMMM YYYY")}
									</sub>
								</div>
							</div>
							<div
								className="btn f-right"
								style={{ cursor: "pointer" }}
								onClick={() =>
									navigate("course-detail", {
										state: {
											id: data.cou_id,
											id_training: data.tra_id,
										},
									})
								}
							>
								<div className="btn border rounded-5">Lihat Detail</div>
							</div>
						</div>
					</div>
				</div>
			))}
			{event.length > visibleCourses && (
				<div className="col-12 text-center mt-4 ">
					<button
						className="btn  text-white mb-5"
						style={{ backgroundColor: COLOR_PRIMARY }}
						onClick={loadMore}
					>
						Load More
					</button>
				</div>
			)}
			{event.length === 0 && (
				<tr>
					<td colSpan={10}>No data available</td>
				</tr>
			)}
		</div>
	);
};

export default CardEvent;
