import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getApiUrlFile } from "../utils/apiConfig";
import { useNavigation } from "../utils/useNavigation";
import { getUrlImage } from "../utils/helper";

const InstructorSlider = ({ instructors }) => {
	const navigate = useNavigation();

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 0,
					dots: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 0,
					dots: false,
				},
			},
		],
	};

	return (
		<Slider {...settings}>
			{instructors.map((instructor) => (
				<div key={instructor.pen_id} className="mb-4">
					<div
						onClick={() =>
							navigate("instructor-detail", {
								state: {
									id: instructor.pen_id,
								},
							})
						}
						style={{ textDecoration: "none", cursor: "pointer" }}
					>
						<div
							style={{ margin: "0 10px" }}
							className="card h-100 border-0 shadow instructor-card"
						>
							<img
								src={getUrlImage(
									encodeURIComponent(instructor.pen_foto_pengajar),
									"IMG_NoImageHuman.png"
								)}
								style={{ height: "150px" }}
								className="img-fluid rounded-circle instructor-image"
								alt={instructor.pen_nama}
							/>
							<div className="card-body text-center">
								<h5 className="fw-bold color-primary">{instructor.pen_nama}</h5>
								<p className="card-text">{instructor.pen_bidang_keahlian}</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</Slider>
	);
};

export default InstructorSlider;
