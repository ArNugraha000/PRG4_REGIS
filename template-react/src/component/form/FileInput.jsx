import React, { useState } from "react";
import PropTypes from "prop-types";
import ValidationError from "./ValidationError";
import ImageModal from "../ImageModal";
import { getApiUrlFile } from "../../utils/apiConfig";
import NoImage from "../../assets/no-image.png";

const FileInput = ({ label, name, onChange, error, fileInputRef, value }) => {
	const [previewImage, setPreviewImage] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handlePreview = () => {
		if (fileInputRef.current.files && fileInputRef.current.files[0]) {
			console.log("fileInputRef.current.files", fileInputRef.current.files);
			const reader = new FileReader();

			reader.onload = (e) => {
				console.log("e.target.result", e.target.result);
				setPreviewImage(e.target.result);
				setShowModal(true);
			};
			reader.readAsDataURL(fileInputRef.current.files[0]);
		} else if (value) {
			setPreviewImage(
				value && value !== ""
					? value.includes("http")
						? value
						: getApiUrlFile(value)
					: NoImage
			);
			setShowModal(true);
		} else {
			alert("No file selected");
		}
	};

	return (
		<div className="">
			<label className="form-label  fw-bold">{label}</label>
			<div className="input-group">
				<input
					type="file"
					className="form-control"
					name={name}
					onChange={onChange}
					ref={fileInputRef}
				/>
				<button
					className="btn btn-outline-primary"
					type="button"
					onClick={handlePreview}
				>
					Preview
				</button>
			</div>

			<ImageModal
				showModal={showModal}
				onHide={() => setShowModal(false)}
				selectedImage={previewImage}
				size={"lg"}
			/>
			{error && <ValidationError message={error} />}
		</div>
	);
};

FileInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FileInput;
