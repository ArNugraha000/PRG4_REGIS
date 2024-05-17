// TinyMCEField.js
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ValidationError from "./ValidationError";
import Loading from "../Loading";

const TinyMCEField = ({ label, name, value, onChange, error }) => {
	const editorRef = useRef();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.setContent(value || "");
		}
	}, [value]);

	const handleEditorChange = (content, editor) => {
		console.log(content);
		try {
			onChange({ target: { name, value: content } });
		} catch (e) {
			console.log(e);
		}
	};

	const handleEditorInit = () => {
		console.log("handleEditorInit");
		setLoading(false);
	};

	return (
		<div className="mb-3">
			<label className="form-label form-label fw-bold">{label}</label>
			{loading && <Loading />}
			<Editor
				apiKey="2sic2zziku5qm1avefxoxluby4uw9oa5ygk1m51mfnf9czny"
				onInit={handleEditorInit}
				init={{
					plugins:
						"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
					toolbar:
						"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
				}}
				value={value}
				onEditorChange={handleEditorChange}
			/>
			{error && <ValidationError message={error} />}
		</div>
	);
};

export default TinyMCEField;
