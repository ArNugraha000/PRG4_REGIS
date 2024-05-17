// LogoSlider.js
import React from "react";
import Slider from "react-slick";

const LogoSlider = ({ logos }) => {
	const settings = {
		className: "slick-logo",
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
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
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Slider {...settings}>
			{logos.map((logo, index) => (
				<div key={index}>
					<img
						src={logo}
						alt={`Logo ${index + 1}`}
						style={{
							width: 300,
							maxWidth: 100,
							margin: "auto",
							alignItems: "center",
						}}
					/>
				</div>
			))}
		</Slider>
	);
};

export default LogoSlider;
