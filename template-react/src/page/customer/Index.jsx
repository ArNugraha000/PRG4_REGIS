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
import { useNavigation } from "../../utils/useNavigation";
import * as yup from "yup";
import { TextField } from "@mui/material";

export default function CustomerRegister({ onChangePage }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [listProvinsi, setListProvinsi] = useState({});
  const [listKabupaten, setListKabupaten] = useState({});
  const [listKecamatan, setListKecamatan] = useState({});
  const [listKelurahan, setListKelurahan] = useState({});
  const [listKodePos, setListKodePos] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigation();

  const formDataRef = useRef({
    namaPerusahaan: "",
    bidangPerusahaan: "",
    pemilikPerusahaan: "",
    alamatPerusahaan: "",
    alamatInvoice: "",
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
    password: "",
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
    alamatPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    alamatInvoice: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    provinsiPerusahaan: string().required("harus diisi"),
    kabupatenPerusahaan: string().required("harus diisi"),
    kecamatanPerusahaan: string().required("harus diisi"),
    kelurahanPerusahaan: string().required("harus diisi"),
    kodeposPerusahaan: string().required("harus diisi"),
    nomorTeleponPerusahaan: yup
      .string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi")
      .test(
        "no-dots",
        "nomor telepon tidak boleh mengandung titik (.)",
        (value) => !/\./.test(value)
      ),
    faxPerusahaan: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    nomorNPWPPerusahaan: string()
      .max(30, "maksimum 30 karakter")
      .required("harus diisi"),
    alamatNPWPPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    nibPerusahaan: string()
      .max(20, "maksimum 20 karakter")
      .required("harus diisi"),
    namaPicFinance: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    nomorTeleponPicFinance: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi")
      .test(
        "no-dots",
        "nomor telepon tidak boleh mengandung titik (.)",
        (value) => !/\./.test(value)
      ),
    emailPicFinance: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicTax: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    nomorTeleponPicTax: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi")
      .test(
        "no-dots",
        "nomor telepon tidak boleh mengandung titik (.)",
        (value) => !/\./.test(value)
      ),
    emailPicTax: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicProcurement: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    nomorTeleponPicProcurement: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi")
      .test(
        "no-dots",
        "nomor telepon tidak boleh mengandung titik (.)",
        (value) => !/\./.test(value)
      ),
    emailPicProcurement: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    berkasNIBPerusahaan: string(),
    berkasNPWPPerusahaan: string(),
    berkasSKTPerusahaan: string(),
    berkasSPPKPPerusahaan: string(),
    berkasSIUPPerusahaan: string(),
    password: string()
      .required("Harus diisi dengan benar")
      .min(8, "Harus minimal 8 karakter")
      .matches(/[a-z]/, "Harus mengandung huruf kecil")
      .matches(/[A-Z]/, "Harus mengandung huruf besar")
      .matches(/[0-9]/, "Harus mengandung angka")
      .matches(/[@$!%*?&]/, "Harus mengandung (@$!%*?&)"),
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
      setListKodePos({});
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
      setListKodePos({});
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
      setListKodePos({});
    }
  }, [formDataRef.current["kecamatanPerusahaan"]]);
  // MENGAMBIL DAFTAR KELURAHAN -- END

  // MENGAMBIL DAFTAR KODEPOS -- BEGIN
  useEffect(() => {
    if (formDataRef.current["kelurahanPerusahaan"]) {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKodePos",
        {
          provinsi: formDataRef.current["provinsiPerusahaan"],
          kabupaten: formDataRef.current["kabupatenPerusahaan"],
          kecamatan: formDataRef.current["kecamatanPerusahaan"],
          kelurahan: formDataRef.current["kelurahanPerusahaan"],
        },
        setListKodePos,
        "Terjadi kesalahan: Gagal mengambil daftar kelurahan."
      );
    }
  }, [formDataRef.current["kelurahanPerusahaan"]]);
  // MENGAMBIL DAFTAR KODEPOS -- END

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
    console.log("handleFileChange", ref.current.files[0]);
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

  // Fungsi untuk memeriksa kesamaan nomor telepon
  const validatePhoneNumbers = (formData) => {
    const {
      nomorTeleponPicFinance,
      nomorTeleponPicTax,
      nomorTeleponPicProcurement,
    } = formData;
    if (
      nomorTeleponPicFinance === nomorTeleponPicTax ||
      nomorTeleponPicFinance === nomorTeleponPicProcurement ||
      nomorTeleponPicTax === nomorTeleponPicProcurement
    ) {
      return false;
    }
    return true;
  };

  // Fungsi untuk memeriksa kesamaan email
  const validateEmails = (formData) => {
    const { emailPicFinance, emailPicTax, emailPicProcurement } = formData;
    if (
      emailPicFinance === emailPicTax ||
      emailPicFinance === emailPicProcurement ||
      emailPicTax === emailPicProcurement
    ) {
      return false;
    }
    return true;
  };

  // Fungsi untuk memeriksa apakah kolom nomor telepon dan email kosong
  const validatePhoneAndEmailNotEmpty = (formData) => {
    const {
      namaPicFinance,
      namaPicTax,
      namaPicProcurement,
      nomorTeleponPicFinance,
      nomorTeleponPicTax,
      nomorTeleponPicProcurement,
      emailPicFinance,
      emailPicTax,
      emailPicProcurement,
    } = formData;

    if (
      !namaPicFinance ||
      !namaPicTax ||
      !namaPicProcurement ||
      !nomorTeleponPicFinance ||
      !nomorTeleponPicTax ||
      !nomorTeleponPicProcurement ||
      !emailPicFinance ||
      !emailPicTax ||
      !emailPicProcurement
    ) {
      return false;
    }

    return true;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors,
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
    const formData = formDataRef.current;
    // Validasi input tidak boleh kosong
    if (!validatePhoneAndEmailNotEmpty(formData)) {
      swal(
        "Error",
        "Data Informasi Umum dan Narahubung tidak boleh ada yang kosong",
        "error"
      );
      return;
    }
    // Validasi nomor telepon tidak boleh sama
    if (!validatePhoneNumbers(formData)) {
      swal(
        "Error",
        "Nomor Telepon PIC Finance, PIC Tax dan PIC Procurement tidak boleh sama",
        "error"
      );
      return;
    }

    // Validasi email tidak boleh sama
    if (!validateEmails(formData)) {
      swal(
        "Error",
        "Email  PIC Finance, PIC Tax dan PIC Procurement tidak boleh sama",
        "error"
      );
      return;
    }
    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});
      const uploadPromises = [];
      const fileInputs = [
        { ref: fileNIBRef, key: "berkasNIBPerusahaan" },
        { ref: fileNPWPRef, key: "berkasNPWPPerusahaan" },
        { ref: fileSKTRef, key: "berkasSKTPerusahaan" },
        { ref: fileSPPKPRef, key: "berkasSPPKPPerusahaan" },
        { ref: fileSIUPRef, key: "berkasSIUPPerusahaan" },
      ];
      fileInputs.forEach((fileInput) => {
        if (fileInput.ref.current.files.length > 0) {
          uploadPromises.push(
            UploadFile(fileInput.ref.current.files[0]).then((data) => {
              formDataRef.current[fileInput.key] = data;
            })
          );
        }
      });
      try {
        await Promise.all(uploadPromises);
        const data = await UseFetch(
          API_LINK + "RegisterCustomer/CreateRegister",
          formDataRef.current
        );
        console.log("Response Data:", data);
        const msg = data["0"].hasil;
        switch (msg) {
          case "FAILED":
            SweetAlert("Gagal", "Nama Perusahaan sudah ada!", "error");
            return;
          case "FAILED1":
            SweetAlert("Gagal", "Email Perusahaan sudah digunakan!", "error");
            return;
          case "FAILED2":
            SweetAlert("Gagal", "Telepon Perusahaan sudah digunakan!", "error");
            return;
          case "FAILED3":
            SweetAlert("Gagal", "Email PIC Finance sudah digunakan!", "error");
            return;
          case "FAILED4":
            SweetAlert(
              "Gagal",
              "Nomor Telepon PIC Finance sudah digunakan!",
              "error"
            );
            return;
          case "FAILED5":
            SweetAlert("Gagal", "Email PIC Tax sudah digunakan!", "error");
            return;
          case "FAILED6":
            SweetAlert("Gagal", "Nomor Telepon Tax sudah digunakan!", "error");
            return;
          case "FAILED7":
            SweetAlert(
              "Gagal",
              "Email PIC Procurement sudah digunakan!",
              "error"
            );
            return;
          case "FAILED8":
            SweetAlert(
              "Gagal",
              "Nomor Telepon PIC Procurement sudah digunakan!",
              "error"
            );
            return;
          case "FAILED9":
            SweetAlert("Gagal", "Nomor Fax sudah digunakan!", "error");
            return;
          case "FAILED10":
            SweetAlert("Gagal", "Nomor NPWP sudah digunakan!", "error");
            return;
          case "FAILED11":
            SweetAlert("Gagal", "Nomor NIB sudah digunakan!", "error");
            return;
          default:
            SweetAlert("Sukses", "Data anda berhasil disimpan", "success");
            // Mengirim email ke pelanggan
            await sendRegistrationEmail();
            navigate("home");
            return;
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
  const sendRegistrationEmail = async () => {
    try {
      const registrationDate = new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      await fetch(API_LINK + "sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formDataRef.current.emailPicProcurement,
          subject: "Registrasi Pelanggan Politeknik Astra",
          html: `
              <p><strong>REGISTRASI PELANGGAN POLITEKNIK ASTRA</strong></p>
              <p>Bersama dengan ini, kami dengan hormat menginformasikan bahwa:</p>
              <p><strong>${formDataRef.current.namaPerusahaan}</strong></p>
              <p>Registrasi telah berhasil pada tanggal ${registrationDate}, terima kasih telah mendaftar sebagai pelanggan di POLITEKNIK ASTRA.</p>
              <p>Hormat kami,</p>
              <p>Tim Registrasi Pelanggan Politeknik Astra</p>
              <p><em>Catatan: Email ini dibuat secara otomatis oleh sistem. Tolong jangan membalas email ini.</em></p>
            `,
        }),
      });
    } catch (error) {
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: error.message,
      }));
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
          <div
            className="card-header fw-medium text-white text-center"
            style={{ backgroundColor: "#0059ab", fontSize: 16 }}
          >
            FORMULIR REGISTRASI CUSTOMER
          </div>
          <div className="card-body p-4">
            <h5 className="card-title mb-0 pb-2 border-bottom">
              Create Account Customer / Membuat Akun Customer
            </h5>
            <br></br>
            <div className="row input-group">
              <div className="col-lg-3">
                <Input
                  type="email"
                  forInput="emailPerusahaan"
                  label="Email Perusahaan"
                  isRequired
                  value={formDataRef.current.emailPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.emailPerusahaan}
                />
              </div>
              <div
                className="col-lg-3"
                style={{
                  display: "flex",
                }}
              >
                <Input
                  type={showPassword ? "text" : "password"} // Ganti tipe antara text dan password
                  forInput="password"
                  label="Password"
                  isRequired
                  value={formDataRef.current.password}
                  onChange={handleInputChange}
                  errorMessage={errors.password}
                  style={{
                    borderRadius: "5px 0 0 5px", // Radius hanya di sisi kiri
                    border: "1px solid #cccc",
                    padding: "8px",
                    width: "350px",
                    height: "37.5px",
                    paddingTop: "7px", // Meningkatkan posisi teks dengan padding atas
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prevState) => !prevState)} // Toggle password visibility
                  className="show-password-btn"
                  style={{
                    marginTop: "32px", // Menambahkan jarak ke bawah
                    backgroundColor: "#0000",
                    color: "#000",
                    border: "1px solid #ccc",
                    borderRadius: "0 4px 4px 0",
                    cursor: "pointer",
                    fontSize: "0.75rem", // Ukuran font lebih kecil
                    padding: "2px 6px", // Padding lebih kecil
                    height: "37.5px", // Pastikan sesuai dengan tinggi input
                    width: "50px",
                  }}
                >
                  {showPassword ? "Hilang" : "Lihat"}
                </button>
              </div>
            </div>
            <br></br>
            <h5 className="card-title mb-0 pb-2 border-bottom">
              General Information / Informasi Umum
            </h5>
            <br></br>
            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="namaPerusahaan"
                  label="Nama Perusahaan"
                  placeholder="Contoh : Politeknik Astra"
                  isRequired
                  value={formDataRef.current.namaPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.namaPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="pemilikPerusahaan"
                  label="Pemilik Perusahaan"
                  placeholder="Pemilik Perusahaan"
                  isRequired
                  value={formDataRef.current.pemilikPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.pemilikPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="bidangPerusahaan"
                  label="Bidang Perusahaan"
                  isRequired
                  value={formDataRef.current.bidangPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.bidangPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="alamatPerusahaan"
                  label="Alamat Perusahaan"
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
                  isRequired
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
                  isRequired
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
                  isRequired
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
                  isRequired
                  arrData={listKelurahan}
                  value={formDataRef.current.kelurahanPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.kelurahanPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <DropDown
                  forInput="kodeposPerusahaan"
                  label="Kode Pos"
                  isRequired
                  arrData={listKodePos}
                  value={formDataRef.current.kodeposPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.kodeposPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  forInput="nomorTeleponPerusahaan"
                  label="Nomor HP/Telepon Perusahaan"
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
                  isRequired
                  value={formDataRef.current.faxPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.faxPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nomorNPWPPerusahaan"
                  label="Nomor NPWP"
                  isRequired
                  value={formDataRef.current.nomorNPWPPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorNPWPPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="alamatNPWPPerusahaan"
                  label="Alamat NPWP"
                  isRequired
                  value={formDataRef.current.alamatNPWPPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.alamatNPWPPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nibPerusahaan"
                  label="NIB Perusahaan"
                  isRequired
                  value={formDataRef.current.nibPerusahaan}
                  onChange={handleInputChange}
                  errorMessage={errors.nibPerusahaan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="alamatInvoice"
                  label="Alamat Invoice"
                  isRequired
                  value={formDataRef.current.alamatInvoice}
                  onChange={handleInputChange}
                  errorMessage={errors.alamatInvoice}
                />
              </div>
            </div>
            <br></br>
            <h5 className="card-title mb-0 pb-2 border-bottom">
              Contact Person / Narahubung
            </h5>
            <div className="row">
              <div className="col-lg-12">
                <table
                  className="table table-bordered"
                  style={{ marginTop: "1rem" }}
                >
                  <thead
                    className="text-white"
                    style={{ backgroundColor: "#00008B" }}
                  >
                    <tr>
                      <th
                        className="text-center text-white"
                        style={{ backgroundColor: "#0059ab" }}
                      >
                        Departemen
                      </th>
                      <th
                        className="text-center text-white"
                        style={{ backgroundColor: "#0059ab" }}
                      >
                        Finance
                      </th>
                      <th
                        className="text-center text-white"
                        style={{ backgroundColor: "#0059ab" }}
                      >
                        Tax
                      </th>
                      <th
                        className="text-center text-white"
                        style={{ backgroundColor: "#0059ab" }}
                      >
                        Procurement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-bold">Nama</td>
                      <td>
                        <Input
                          type="text"
                          forInput="namaPicFinance"
                          label=""
                          isRequired
                          value={formDataRef.current.namaPicFinance}
                          onChange={handleInputChange}
                          errorMessage={errors.namaPicFinance}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          forInput="namaPicTax"
                          label=""
                          isRequired
                          value={formDataRef.current.namaPicTax}
                          onChange={handleInputChange}
                          errorMessage={errors.namaPicTax}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          forInput="namaPicProcurement"
                          label=""
                          isRequired
                          value={formDataRef.current.namaPicProcurement}
                          onChange={handleInputChange}
                          errorMessage={errors.namaPicProcurement}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Nomor Telepon</td>
                      <td>
                        <Input
                          type="number"
                          forInput="nomorTeleponPicFinance"
                          label=""
                          isRequired
                          value={formDataRef.current.nomorTeleponPicFinance}
                          onChange={handleInputChange}
                          errorMessage={errors.nomorTeleponPicFinance}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          forInput="nomorTeleponPicTax"
                          label=""
                          isRequired
                          value={formDataRef.current.nomorTeleponPicTax}
                          onChange={handleInputChange}
                          errorMessage={errors.nomorTeleponPicTax}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          forInput="nomorTeleponPicProcurement"
                          label=""
                          isRequired
                          value={formDataRef.current.nomorTeleponPicProcurement}
                          onChange={handleInputChange}
                          errorMessage={errors.nomorTeleponPicProcurement}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        <Input
                          type="email"
                          forInput="emailPicFinance"
                          label=""
                          isRequired
                          value={formDataRef.current.emailPicFinance}
                          onChange={handleInputChange}
                          errorMessage={errors.emailPicFinance}
                        />
                      </td>
                      <td>
                        <Input
                          type="email"
                          forInput="emailPicTax"
                          label=""
                          isRequired
                          value={formDataRef.current.emailPicTax}
                          onChange={handleInputChange}
                          errorMessage={errors.emailPicTax}
                        />
                      </td>
                      <td>
                        <Input
                          type="email"
                          forInput="emailPicProcurement"
                          label=""
                          // isRequired
                          value={formDataRef.current.emailPicProcurement}
                          onChange={handleInputChange}
                          errorMessage={errors.emailPicProcurement}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br></br>
            <h5 className="card-title mb-0 pb-2 border-bottom">
              Attachment / Lampiran
            </h5>
            <br></br>
            <div className="row">
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasNIBPerusahaan"
                  label="Berkas NIB (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileNIBRef}
                  onChange={() => handleFileChange(fileNIBRef, "pdf,jpg,png")}
                  errorMessage={errors.berkasNIBPerusahaan}
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
                  forInput="berkasSIUPPerusahaan"
                  label="Berkas SIUP (.pdf, .jpg, .png, .zip)"
                  formatFile=".pdf,.jpg,.png,.zip"
                  ref={fileSIUPRef}
                  onChange={() =>
                    handleFileChange(fileSIUPRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasSIUPPerusahaan}
                />
              </div>
            </div>
            <br></br>
            <div className="col-lg-3">
              <Button
                classType="secondary me-2 px-4 py-2"
                label="BATAL"
                onClick={() => onChangePage("Home")}
              />
              <Button
                classType="primary ms-2 px-4 py-2"
                type="submit"
                onClick={handleAdd}
                label="SIMPAN"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
