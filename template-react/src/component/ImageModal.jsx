import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ showModal, onHide, selectedImage, size }) => {
	return (
		<Modal show={showModal} onHide={onHide} size={size} centered>
			<Modal.Body>
				{selectedImage &&
					(selectedImage.includes(".mp4") ||
					selectedImage.includes("video/mp4") ? (
						<video width="100%" height="auto" controls>
							<source src={selectedImage} type="video/mp4" />
						</video>
					) : (
						<img
							src={selectedImage}
							alt="Selected Image"
							style={{ width: "100%" }}
						/>
					))}
			</Modal.Body>
		</Modal>
	);
};

export default ImageModal;
