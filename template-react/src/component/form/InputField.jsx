import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ValidationError from "./ValidationError";

const InputField = ({
	label,
	type,
	name,
	value,
	onChange,
	placeholder,
	error,
}) => {
	useEffect(() => {
		console.log(value);
	}, []);
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label fw-bold">
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={`form-control ${error ? "is-invalid" : ""}`}
			/>
			{error && <ValidationError message={error} />}
		</div>
	);
};

InputField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
};

export default InputField;
