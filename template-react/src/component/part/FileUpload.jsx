import { forwardRef } from "react";

const FileUpload = forwardRef(function FileUpload(
  {
    formatFile = "",
    label = "",
    forInput = "",
    isRequired = false,
    errorMessage,
    ...props
  },
  ref
) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={forInput} className="form-label fw-bold">
          {label}
          {isRequired ? <span className="text-danger"> *</span> : ""}
          {errorMessage ? (
            <span className="fw-normal text-danger">
              <br />
              {errorMessage}
            </span>
          ) : (
            ""
          )}
        </label>
        <input
          className="form-control"
          type="file"
          id={forInput}
          name={forInput}
          accept={formatFile}
          ref={ref}
          {...props}
        />
        <sub>Maksimum ukuran berkas adalah 10 MB</sub>
      </div>
    </>
  );
});

export default FileUpload;
