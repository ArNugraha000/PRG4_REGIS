import React, { useState, useEffect, useRef } from "react";
import PageTitle from "../../component/PageTitle";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import UploadFile from "../../util/UploadFile";
import Button from "../../component/part/Button";
import DropDown from "../../component/part/Dropdown";
import Input from "../../component/part/Input";
import FileUpload from "../../component/part/FileUpload";
import Loading from "../../component/part/Loading";
import Alert from "../../component/part/Alert";



export default function RegistrasiForm({ onChangePage }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [listProvinsi, setListProvinsi] = useState({});
  const [listKabupaten, setListKabupaten] = useState({});
  const [listKecamatan, setListKecamatan] = useState({});
  const [listKelurahan, setListKelurahan] = useState({});

  const formDataRef = useRef({
    namaPerusahaan: "",
    bidangPerusahaan: "",
    pemilikPerusahaan: "",
    alamatPerusahaan: "",
    provinsiPerusahaan: "",
    kabupatenPerusahaan: "",
    kecamatanPerusahaan: "",
    kelurahanPerusahaan: "",
    kodeposPerusahaan: "",
    nomorTeleponPerusahaan: "",
    faxPerusahaan: "",
    emailPerusahaan: "",
    nomorNPWPPerusahaan: "",
    alamatNPWPPerusahaan: "",
    nibPerusahaan: "",
    namaPicFinance: "",
    nomorTeleponPicFinance: "",
    emailPicFinance: "",
    namaPicTax: "",
    nomorTeleponPicTax: "",
    emailPicTax: "",
    namaPicProcurement: "",
    nomorTeleponPicProcurement: "",
    emailPicProcurement: "",
    berkasNIBPerusahaan: "",
    berkasNPWPPerusahaan: "",
    berkasSKTPerusahaan: "",
    berkasSPPKPPerusahaan: "",
    berkasSIUPPerusahaan: "",
  });
  const fileNIBRef = useRef(null);
  const fileNPWPRef = useRef(null);
  const fileSKTRef = useRef(null);
  const fileSPPKPRef = useRef(null);
  const fileSIUPRef = useRef(null);

  const userSchema = object({
    namaPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    bidangPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    pemilikPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    alamatPerusahaan: string().required("harus diisi"),
    provinsiPerusahaan: string(),
    kabupatenPerusahaan: string(),
    kecamatanPerusahaan: string(),
    kelurahanPerusahaan: string(),
    kodeposPerusahaan: string(),
    nomorTeleponPerusahaan: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    faxPerusahaan: string().max(15, "maksimum 15 karakter"),
    emailPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    nomorNPWPPerusahaan: string().max(30, "maksimum 30 karakter"),
    alamatNPWPPerusahaan: string().max(100, "maksimum 100 karakter"),
    nibPerusahaan: string().max(100, "maksimum 100 karakter"),
    namaPicFinance: string()
    .max(100, "maksimum 100 karakter")
    .required("harus diisi"),
    nomorTeleponPicFinance: string()
    .max(15, "maksimum 15 karakter")
    .required("harus diisi"),
    emailPicFinance: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicTax: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    nomorTeleponPicTax: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPicTax: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicProcurement: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    nomorTeleponPicProcurement: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPicProcurement: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
      
    berkasNIBPerusahaan: string(),
    berkasNPWPPerusahaan: string(),
    berkasSKTPerusahaan: string(),
    berkasSPPKPPerusahaan: string(),
    berkasLainPerusahaan: string(),
  });

  const fetchDataByEndpointAndParams = async (
    endpoint,
    params,
    setter,
    errorMessage
  ) => {
    setIsError((prevError) => ({ ...prevError, error: false }));
    try {
      const data = await UseFetch(endpoint, params);
      if (data === "ERROR") {
        throw new Error(errorMessage);
      } else {
        setter(data);
      }
    } catch (error) {
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: error.message,
      }));
      setter({});
    }
  };

  // MENGAMBIL DAFTAR PROVINSI -- BEGIN
  useEffect(() => {
    fetchDataByEndpointAndParams(
      API_LINK + "Utilities/GetListProvinsi",
      {},
      setListProvinsi,
      "Terjadi kesalahan: Gagal mengambil daftar provinsi."
    );
  }, []);
  // MENGAMBIL DAFTAR PROVINSI -- END

  // MENGAMBIL DAFTAR KABUPATEN/KOTA -- BEGIN
  useEffect(() => {
    if (formDataRef.current["provinsiPerusahaan"]) {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKabupaten",
        { provinsi: formDataRef.current["provinsiPerusahaan"] },
        setListKabupaten,
        "Terjadi kesalahan: Gagal mengambil daftar kabupaten/kota."
      );
      setListKecamatan({});
      setListKelurahan({});
    }
  }, [formDataRef.current["provinsiPerusahaan"]]);
  // MENGAMBIL DAFTAR KABUPATEN/KOTA -- END

  // MENGAMBIL DAFTAR KECAMATAN -- BEGIN
  useEffect(() => {
    if (formDataRef.current["kabupatenPerusahaan"]) {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKecamatan",
        {
          provinsi: formDataRef.current["provinsiPerusahaan"],
          kabupaten: formDataRef.current["kabupatenPerusahaan"],
        },
        setListKecamatan,
        "Terjadi kesalahan: Gagal mengambil daftar kecamatan."
      );
      setListKelurahan({});
    }
  }, [formDataRef.current["kabupatenPerusahaan"]]);
  // MENGAMBIL DAFTAR KECAMATAN -- END

  // MENGAMBIL DAFTAR KELURAHAN -- BEGIN
  useEffect(() => {
    if (formDataRef.current["kecamatanPerusahaan"]) {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKelurahan",
        {
          provinsi: formDataRef.current["provinsiPerusahaan"],
          kabupaten: formDataRef.current["kabupatenPerusahaan"],
          kecamatan: formDataRef.current["kecamatanPerusahaan"],
        },
        setListKelurahan,
        "Terjadi kesalahan: Gagal mengambil daftar kelurahan."
      );
    }
  }, [formDataRef.current["kecamatanPerusahaan"]]);
  // MENGAMBIL DAFTAR KELURAHAN -- END

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleFileChange = async (ref, extAllowed) => {
    const { name, value } = ref.current;
    const file = ref.current.files[0];
    const fileName = file.name;
    const fileSize = file.size;
    const fileExt = fileName.split(".").pop();
    const validationError = await validateInput(name, value, userSchema);
    let error = "";

    if (fileSize / 1024576 > 10) error = "berkas terlalu besar";
    else if (!extAllowed.split(",").includes(fileExt))
      error = "format berkas tidak valid";

    if (error) ref.current.value = "";

    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});

      const uploadPromises = [];

      const fileInputs = [
        { ref: fileNPWPRef, key: "berkasNPWPPerusahaan" },
        { ref: fileSPPKPRef, key: "berkasSPPKPPerusahaan" },
        { ref: fileSKTRef, key: "berkasSKTPerusahaan" },
        { ref: fileLainRef, key: "berkasLainPerusahaan" },
      ];

      fileInputs.forEach((fileInput) => {
        if (fileInput.ref.current.files.length > 0) {
          uploadPromises.push(
            UploadFile(fileInput.ref.current).then(
              (data) => (formDataRef.current[fileInput.key] = data.Hasil)
            )
          );
        }
      });

      try {
        await Promise.all(uploadPromises);

        const data = await UseFetch(
          API_LINK + "MasterPerusahaan/CreatePerusahaan",
          formDataRef.current
        );

        if (data === "ERROR") {
          throw new Error("Terjadi kesalahan: Gagal menyimpan data pelanggan.");
        } else {
          SweetAlert("Sukses", "Data pelanggan berhasil disimpan", "success");
          onChangePage("index");
        }
      } catch (error) {
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {/* {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )} */}
      <form onSubmit={handleAdd}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Formulir Registrasi Customer
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="namaPerusahaan"
                  label="Nama Perusahaan"
                  isRequired
                  value={formDataRef.current.namaPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.namaPerusahaan}
                />
              </div>
              <div className="col-lg-9">
                <Input
                  type="text"
                  forInput="alamatPerusahaan"
                  label="Alamat"
                  isRequired
                  value={formDataRef.current.alamatPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.alamatPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <DropDown
                  forInput="provinsiPerusahaan"
                  label="Provinsi"
                  arrData={listProvinsi}
                  value={formDataRef.current.provinsiPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.provinsiPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <DropDown
                  forInput="kabupatenPerusahaan"
                  label="Kabupaten/Kota"
                  arrData={listKabupaten}
                  value={formDataRef.current.kabupatenPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.kabupatenPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <DropDown
                  forInput="kecamatanPerusahaan"
                  label="Kecamatan"
                  arrData={listKecamatan}
                  value={formDataRef.current.kecamatanPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.kecamatanPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <DropDown
                  forInput="kelurahanPerusahaan"
                  label="Kelurahan/Desa"
                  arrData={listKelurahan}
                  value={formDataRef.current.kelurahanPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.kelurahanPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nomorTeleponPerusahaan"
                  label="Nomor HP/Telepon"
                  isRequired
                  value={formDataRef.current.nomorTeleponPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorTeleponPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="faxPerusahaan"
                  label="Nomor Fax"
                  value={formDataRef.current.faxPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.faxPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="email"
                  forInput="emailPerusahaan"
                  label="Email"
                  isRequired
                  value={formDataRef.current.emailPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.emailPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nomorNPWPPerusahaan"
                  label="Nomor NPWP"
                  value={formDataRef.current.nomorNPWPPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorNPWPPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="kontakPersonPenagihan"
                  label="Contact Person Penagihan"
                  value={formDataRef.current.kontakPersonPenagihan}
                  onChange={handleInputChange}
                  errorMessage={errors.kontakPersonPenagihan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="email"
                  forInput="emailPenagihan"
                  label="Email Penagihan"
                  value={formDataRef.current.emailPenagihan}
                  onChange={handleInputChange}
                  errorMessage={errors.emailPenagihan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="kontakPersonPajak"
                  label="Contact Person Pajak"
                  value={formDataRef.current.kontakPersonPajak}
                  onChange={handleInputChange}
                  errorMessage={errors.kontakPersonPajak}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="email"
                  forInput="emailPajak"
                  label="Email Pajak"
                  value={formDataRef.current.emailPajak}
                  onChange={handleInputChange}
                  errorMessage={errors.emailPajak}
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasNPWPPerusahaan"
                  label="Berkas NPWP (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileNPWPRef}
                  onChange={() => handleFileChange(fileNPWPRef, "pdf,jpg,png")}
                  errorMessage={errors.berkasNPWPPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasSPPKPPerusahaan"
                  label="Berkas SPPKP (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileSPPKPRef}
                  onChange={() => handleFileChange(fileSPPKPRef, "pdf,jpg,png")}
                  errorMessage={errors.berkasSPPKPPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasSKTPerusahaan"
                  label="Berkas SKT (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileSKTRef}
                  onChange={() => handleFileChange(fileSKTRef, "pdf,jpg,png")}
                  errorMessage={errors.berkasSKTPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasLainPerusahaan"
                  label="Berkas Lainnya (.pdf, .jpg, .png, .zip)"
                  formatFile=".pdf,.jpg,.png,.zip"
                  ref={fileLainRef}
                  onChange={() =>
                    handleFileChange(fileLainRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasLainPerusahaan}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="float-end my-4 mx-1">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="BATAL"
            onClick={() => onChangePage("index")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SIMPAN"
          />
        </div> */}
      </form>
    </>
  );
}
