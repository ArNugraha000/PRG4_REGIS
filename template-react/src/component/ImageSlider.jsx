// ImageSlider.jsx

import React from "react";
import { Carousel } from "react-bootstrap";
import { getApiUrlFile } from "../utils/apiConfig";

const ImageSlider = ({ images, type }) => {
	return (
		<Carousel>
			{images.map((image, index) => (
				<Carousel.Item key={index}>
					<img
						className="d-block w-100 rounded"
						src={getApiUrlFile(image.ban_gambar)}
						alt={`Slide ${index}`}
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ImageSlider;
