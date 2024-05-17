import React from "react";
import PropTypes from "prop-types";
import ValidationError from "./ValidationError";

const DropdownList = ({
	label,
	name,
	label_id,
	value,
	options,
	onChange,
	placeholder,
	error,
}) => {
	console.log("DropdownList", value);
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label form-label fw-bold">
				{label}
			</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				className={`form-select ${error ? "is-invalid" : ""}`}
			>
				<option value="" disabled>
					{placeholder}
				</option>
				{options.map((option, index) => (
					<option key={index} value={option[name]}>
						{option[label_id]}
					</option>
				))}
			</select>
			{error && <ValidationError message={error} />}
		</div>
	);
};

DropdownList.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		})
	).isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
};

export default DropdownList;
