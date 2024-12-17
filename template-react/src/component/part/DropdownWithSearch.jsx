// src/components/DropdownWithSearch.jsx
import React from 'react';
import Select from 'react-select';

const DropdownWithSearch = ({ forInput, label, arrData, value, onChange, errorMessage }) => {
  const handleChange = (selectedOption) => {
    onChange({ target: { name: forInput, value: selectedOption?.value || '' } });
  };

  const options = arrData.map(item => ({ value: item.id, label: item.name }));

  return (
    <div className="form-group">
      <label htmlFor={forInput}>{label}</label>
      <Select
        id={forInput}
        name={forInput}
        value={options.find(option => option.value === value)}
        onChange={handleChange}
        options={options}
        isClearable
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default DropdownWithSearch;
