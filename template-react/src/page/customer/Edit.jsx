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
import Label from "../../component/part/Label";
import FileUpload from "../../component/part/FileUpload";
import Loading from "../../component/part/Loading";
import Alert from "../../component/part/Alert";
import { useNavigation } from "../../utils/useNavigation";
import { encode as base64Encode, decode as base64Decode } from "base-64";
import { number } from "prop-types";
import { decryptId } from "../../utils/encryptor";
import Cookies from "js-cookie";

export default function CustomerEdit({ onChangePage, withID }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);
  const [listKelurahan, setListKelurahan] = useState([]);
  const [listKodePos, setListKodePos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);

  const navigate = useNavigation();

  const formDataRef = useRef({
    idPelanggan: "",
    kodePelanggan: "",
    namaPerusahaan: "",
    pemilikPerusahaan: "",
    bidangPerusahaan: "",
    alamatPerusahaan: "",
    alamatInvoice: "",
    provinsiPerusahaan: "",
    kabupatenPerusahaan: "",
    kecamatanPerusahaan: "",
    kelurahanPerusahaan: "",
    kodePos: "",
    nomorTeleponPelanggan: "",
    faxPelanggan: "",
    emailPelanggan: "",
    nomorNPWPPelanggan: "",
    alamatNPWP: "",
    nomorNIB: "",
    namaPicFinance: "",
    tlpPicFinance: "",
    emailPicFinance: "",
    namaPicTax: "",
    tlpPicTax: "",
    emailPicTax: "",
    namaPicProcurement: "",
    tlpPicProcurement: "",
    emailPicProcurement: "",
    berkasNIBPelanggan: "",
    berkasNPWPPelanggan: "",
    berkasSKTPelanggan: "",
    berkasSPPKPPelanggan: "",
    berkasSIUPPelanggan: "",
    statusPelanggan: "Aktif",
    url_berkasSIUPPelanggan: "",
    url_berkasSKTPelanggan: "",
    url_berkasSPPKPPelanggan: "",
    url_berkasNPWPPelanggan: "",
    url_berkasNIBPelanggan: "",
  });

  const userSchema = object({
    namaPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    kodePelanggan: string(),
    idPelanggan: string(),
    berkasNIBPelanggan: string(),
    berkasNPWPPelanggan: string(),
    berkasSKTPelanggan: string(),
    berkasSPPKPPelanggan: string(),
    berkasSIUPPelanggan: string(),
    statusPelanggan: string(),
    pemilikPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    bidangPerusahaan: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    provinsiPerusahaan: string().required("harus dipilih"),
    kabupatenPerusahaan: string().required("harus dipilih"),
    kecamatanPerusahaan: string().required("harus dipilih"),
    kelurahanPerusahaan: string().required("harus dipilih"),
    kodePos: string().required("harus diisi"),
    faxPelanggan: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    nomorNIB: string().max(19, "maksimum 19 karakter").required("harus diisi"),
    nomorNPWPPelanggan: string()
      .max(30, "maksimum 30 karakter")
      .required("harus diisi"),
    alamatNPWP: string().required("harus diisi"),
    alamatPerusahaan: string().required("harus diisi"),
    alamatInvoice: string().required("harus diisi"),
    nomorTeleponPelanggan: string()
      .min(1, "minimal 1 karakter")
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPelanggan: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicFinance: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    tlpPicFinance: string()
      .min(1, "minimal 1 karakter")
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPicFinance: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicTax: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    tlpPicTax: string()
      .min(1, "minimal 1 karakter")
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPicTax: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    namaPicProcurement: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    tlpPicProcurement: string()
      .min(1, "minimal 1 karakter")
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    emailPicProcurement: string()
      .max(100, "maksimum 100 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    url_berkasSIUPPelanggan: string(),
    url_berkasSKTPelanggan: string(),
    url_berkasSPPKPPelanggan: string(),
    url_berkasNPWPPelanggan: string(),
    url_berkasNIBPelanggan: string(),
  });

  const fileNIBRef = useRef(null);
  const fileNPWPRef = useRef(null);
  const fileSKTRef = useRef(null);
  const fileSPPKPRef = useRef(null);
  const fileSIUPRef = useRef(null);

  const fetchDataByEndpointAndParams = async (
    endpoint,
    params,
    setter,
    errorMessage
  ) => {
    setIsError((prevError) => ({ ...prevError, error: false }));
    //setIsLoading(true);
    try {
      const data = await UseFetch(endpoint, params);
      if (data === "ERROR") {
        throw new Error(errorMessage);
      } else {
        setter(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: error.message,
      }));
      setter([]);
    }
  };

  const fetchDataProvinsi = async () => {
    setIsLoading(true);
    try {
      while (true) {
        let data = await UseFetch(API_LINK + "Utilities/GetListProvinsi", {});
        if (data.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          setListProvinsi(data);
          setIsLoading(false);
          break;
        }
      }
    } catch (error) {
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: error.message,
      }));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataProvinsi();

    const fetchData = async (retries = 3, delay = 1000) => {
      let success = false;

      // Mulai pengambilan data
      for (let i = 0; i < retries; i++) {
        setIsError({ error: false, message: "" });

        try {
          // Ambil data pelanggan berdasarkan ID
          const response = await UseFetch(
            API_LINK + "RegisterCustomer/GetDataRegisterById",
            { id: withID }
          );

          if (response.length !== 0) {
            // Jika data berhasil diambil, simpan ke formDataRef
            formDataRef.current = { ...formDataRef.current, ...response[0] };

            // Lakukan pengunduhan file jika ada
            const filePromises = [];
            Object.keys(formDataRef.current).forEach((key) => {
              if (key.startsWith("berkas")) {
                const berkasPromise = fetch(
                  API_LINK +
                    `Upload/DownloadFile?namaFile=${encodeURIComponent(
                      formDataRef.current[key]
                    )}`
                )
                  .then((response) => response.blob())
                  .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    formDataRef.current[`url_${key}`] = url;
                    return formDataRef.current;
                  })
                  .catch((error) => {
                    console.error(`Error fetching ${key}:`, error);
                    return formDataRef.current;
                  });
                filePromises.push(berkasPromise);
              }
            });

            // Tunggu hingga semua file diunduh
            await Promise.all(filePromises)
              .then((results) => {
                console.log("All files downloaded:", results);
              })
              .catch((error) => {
                console.error("Error downloading some files:", error);
              });

            success = true;
            break; // Keluar dari loop jika data berhasil diambil dan file diunduh
          }

          // Jika ada kesalahan atau data tidak ditemukan, lempar error
          if (response === "ERROR" || response.length === 0) {
            throw new Error(
              "Terjadi kesalahan: Gagal mengambil data pelanggan."
            );
          }
        } catch (error) {
          // Tangani kesalahan dan coba lagi setelah delay
          setIsError({ error: true, message: error.message });
          await new Promise((res) => setTimeout(res, delay)); // Tunggu sebelum retry
        } finally {
          setIsLoading(false);
        }
      }

      // Jika tidak berhasil mengambil data setelah beberapa kali percobaan
      if (!success) {
        setIsError({
          error: true,
          message: "Gagal mengambil data setelah beberapa kali percobaan.",
        });
      }
    };

    if (withID) {
      fetchData();
    }
  }, [withID]);

  // useEffect(() => {
  //   const fetchData = async (retries = 3, delay = 1000) => {
  //     let success = false;

  //     for (let i = 0; i < retries; i++) {
  //       setIsError({ error: false, message: "" });

  //       try {
  //         const response = await UseFetch(
  //           API_LINK + "RegisterCustomer/GetDataRegisterById",
  //           { id: withID }
  //         );

  //         if (response.length !== 0) {
  //           formDataRef.current = { ...formDataRef.current, ...response[0] };
  //           success = true;
  //           break; // Keluar dari loop jika data berhasil diambil
  //         }

  //         if (response === "ERROR" || response.length === 0) {
  //           throw new Error(
  //             "Terjadi kesalahan: Gagal mengambil data pelanggan."
  //           );
  //         }
  //       } catch (error) {
  //         setIsError({ error: true, message: error.message });
  //         await new Promise((res) => setTimeout(res, delay)); // Tunggu sebelum retry
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }

  //     if (!success) {
  //       setIsError({
  //         error: true,
  //         message: "Gagal mengambil data setelah beberapa kali percobaan.",
  //       });
  //     }
  //   };

  //   if (withID) {
  //     fetchData();
  //   }
  // }, [withID]);

  useEffect(() => {
    const userCookie = Cookies.get("user"); // Ambil data user dari cookie
    if (userCookie) {
      const decodedCookie = decodeURIComponent(userCookie); // Decode cookie
      const decryptedData = decryptId(decodedCookie); // Dekripsi cookie
      const userData = JSON.parse(decryptedData); // Parse ke objek

      if (userData.id) {
        // Anda bisa menyimpan ID ke state jika dibutuhkan
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDataProvinsi();
    setIsLoading(true);
    // Ambil ID dari URL
    const idUrl = new URLSearchParams(window.location.search).get("id");
    const decodedId = idUrl ? base64Decode(idUrl) : null;

    // Ambil ID dari cookie (state user)
    const cookieId = user?.id || null;

    // Tentukan ID yang akan digunakan (prioritaskan cookieId jika ada)
    const finalId = cookieId || decodedId;

    if (finalId) {
      //const decodedId = base64Decode(idUrl); // Decode the ID
      const fetchData = async () => {
        setIsError((prevError) => ({ ...prevError, error: false }));
        try {
          while (true) {
            let data = await UseFetch(
              API_LINK + "RegisterCustomer/GetDataRegisterEditById",
              { idPelanggan: finalId } // Use the decoded ID here
            );
            if (data === "ERROR") {
              throw new Error(
                "Terjadi kesalahan: Gagal mengambil data pelanggan."
              );
            } else if (data.length === 0) {
              await new Promise((resolve) => setTimeout(resolve, 2000));
            } else {
              const customerData = data[0];
              formDataRef.current = { ...formDataRef.current, ...customerData };
              const filePromises = [];
              Object.keys(formDataRef.current).forEach((key) => {
                if (key.startsWith("berkas")) {
                  const berkasPromise = fetch(
                    API_LINK +
                      `Upload/DownloadFile?namaFile=${encodeURIComponent(
                        formDataRef.current[key]
                      )}`
                  )
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = URL.createObjectURL(blob);
                      formDataRef.current[`url_${key}`] = url;
                      return formDataRef.current;
                    })
                    .catch((error) => {
                      console.error(`Error fetching ${key}:`, error);
                      return formDataRef.current;
                    });
                  filePromises.push(berkasPromise);
                }
              });
              // Tunggu hingga semua file diunduh
              Promise.all(filePromises)
                .then((results) => {
                  console.log("All files downloaded:", results);
                })
                .catch((error) => {
                  console.error("Error downloading some files:", error);
                });
              break;
            }
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
      };

      fetchData();
    } else {
      console.log("ID pelanggan tidak ditemukan di URL.");
    }
  }, [user]);

  useEffect(() => {
    if (formDataRef.current.provinsiPerusahaan) {
      let prov = formDataRef.current.provinsiPerusahaan;
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKabupaten",
        { provinsi: prov },
        setListKabupaten,
        "Terjadi kesalahan: Gagal mengambil daftar kabupaten/kota."
      );
    }
  }, [formDataRef.current.provinsiPerusahaan]);

  useEffect(() => {
    if (listKabupaten.length > 0) {
      let prov = formDataRef.current.provinsiPerusahaan;
      let kab = formDataRef.current.kabupatenPerusahaan;
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKecamatan",
        {
          provinsi: prov,
          kabupaten: kab,
        },
        setListKecamatan,
        "Terjadi kesalahan: Gagal mengambil daftar kecamatan."
      );
    }
  }, [listKabupaten, formDataRef.current.kabupatenPerusahaan]);

  useEffect(() => {
    if (listKecamatan.length > 0) {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKelurahan",
        {
          provinsi: formDataRef.current.provinsiPerusahaan,
          kabupaten: formDataRef.current.kabupatenPerusahaan,
          kecamatan: formDataRef.current.kecamatanPerusahaan,
        },
        setListKelurahan,
        "Terjadi kesalahan: Gagal mengambil daftar kelurahan."
      );
    }
  }, [listKecamatan, formDataRef.current.kecamatanPerusahaan]);

  useEffect(() => {
    if (listKelurahan.length > 0) {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKodePos",
        {
          provinsi: formDataRef.current.provinsiPerusahaan,
          kabupaten: formDataRef.current.kabupatenPerusahaan,
          kecamatan: formDataRef.current.kecamatanPerusahaan,
          kelurahan: formDataRef.current.kelurahanPerusahaan,
        },
        setListKodePos,
        "Terjadi kesalahan: Gagal mengambil daftar KodePos."
      );
    }
  }, [listKelurahan, formDataRef.current.kelurahanPerusahaan]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    formDataRef.current[name] = value;
    if (name === "provinsiPerusahaan") {
      let prov = formDataRef.current.provinsiPerusahaan;
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKabupaten",
        { provinsi: prov },
        setListKabupaten,
        "Terjadi kesalahan: Gagal mengambil daftar kabupaten/kota."
      );
      setListKecamatan([]);
      setListKelurahan([]);
      setListKodePos([]);
    } else if (name === "kabupatenPerusahaan") {
      let prov = formDataRef.current.provinsiPerusahaan;
      let kab = formDataRef.current.kabupatenPerusahaan;
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKecamatan",
        {
          provinsi: prov,
          kabupaten: kab,
        },
        setListKecamatan,
        "Terjadi kesalahan: Gagal mengambil daftar kecamatan."
      );
      setListKelurahan([]);
      setListKodePos([]);
    } else if (name === "kecamatanPerusahaan") {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKelurahan",
        {
          provinsi: formDataRef.current.provinsiPerusahaan,
          kabupaten: formDataRef.current.kabupatenPerusahaan,
          kecamatan: formDataRef.current.kecamatanPerusahaan,
        },
        setListKelurahan,
        "Terjadi kesalahan: Gagal mengambil daftar kelurahan."
      );
      setListKodePos([]);
    } else if (name === "kodeposPerusahaan") {
      fetchDataByEndpointAndParams(
        API_LINK + "Utilities/GetListKodePos",
        {
          provinsi: formDataRef.current.provinsiPerusahaan,
          kabupaten: formDataRef.current.kabupatenPerusahaan,
          kecamatan: formDataRef.current.kecamatanPerusahaan,
          kelurahan: formDataRef.current.kelurahanPerusahaan,
        },
        setListKodePos,
        "Terjadi kesalahan: Gagal mengambil daftar Kodepos."
      );
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleFileChange = async (ref, extAllowed) => {
    const { name } = ref.current;
    const file = ref.current.files[0];
    const fileName = file.name;
    const fileSize = file.size;
    const fileExt = fileName.split(".").pop();
    const validationError = await validateInput(name, file, userSchema);
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

  useEffect(() => {
    //console.log(formDataRef.current);
  }, [formDataRef.current]);

  const handleNew = async (e) => {
    e.preventDefault();
    console.log("here");
  };
  // Fungsi untuk memeriksa kesamaan nomor telepon
  const validatePhoneNumbers = (formData) => {
    const { tlpPicFinance, tlpPicTax, tlpPicProcurement } = formData;
    if (
      tlpPicFinance === tlpPicTax ||
      tlpPicFinance === tlpPicProcurement ||
      tlpPicTax === tlpPicProcurement
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
      tlpPicFinance,
      tlpPicTax,
      tlpPicProcurement,
      emailPicFinance,
      emailPicTax,
      emailPicProcurement,
    } = formData;

    if (
      !namaPicFinance ||
      !namaPicTax ||
      !namaPicProcurement ||
      !tlpPicFinance ||
      !tlpPicTax ||
      !tlpPicProcurement ||
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

    console.log("Initial Form Data:", formDataRef.current);

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors,
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );

    console.log("Validation Errors:", validationErrors);
    console.log(
      "Validation Passed:",
      Object.values(validationErrors).every((error) => !error)
    );

    const formData = formDataRef.current;

    console.log("Checking if phone and email fields are not empty...");
    // Validasi input tidak boleh kosong
    if (!validatePhoneAndEmailNotEmpty(formData)) {
      swal(
        "Error",
        "Data Informasi Umum dan Narahubung tidak boleh ada yang kosong",
        "error"
      );
      return;
    }

    console.log("Validating phone numbers...");
    console.log("Phone validation result:", validatePhoneNumbers(formData));
    // Validasi nomor telepon tidak boleh sama
    if (!validatePhoneNumbers(formData)) {
      swal(
        "Error",
        "Nomor Telepon PIC Finance, PIC Tax dan PIC Procurement tidak boleh sama",
        "error"
      );
      return;
    }

    console.log("Validating emails...");
    console.log("Email validation result:", validateEmails(formData));
    // Validasi email tidak boleh sama
    if (!validateEmails(formData)) {
      swal(
        "Error",
        "Email PIC Finance, PIC Tax dan PIC Procurement tidak boleh sama",
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
        { ref: fileNIBRef, key: "berkasNIBPelanggan" },
        { ref: fileNPWPRef, key: "berkasNPWPPelanggan" },
        { ref: fileSPPKPRef, key: "berkasSPPKPPelanggan" },
        { ref: fileSKTRef, key: "berkasSKTPelanggan" },
        { ref: fileSIUPRef, key: "berkasSIUPPelanggan" },
      ];
      fileInputs.forEach((fileInput) => {
        if (fileInput.ref.current.files.length > 0) {
          console.log(`Processing file for key: ${fileInput.key}`);
          uploadPromises.push(
            UploadFile(fileInput.ref.current.files[0]).then((data) => {
              formDataRef.current[fileInput.key] = data;
            })
          );
        }
      });

      try {
        await Promise.all(uploadPromises);
        const payload = { ...formDataRef.current };
        delete payload.url_berkasSIUPPelanggan;
        delete payload.url_berkasSKTPelanggan;
        delete payload.url_berkasSPPKPPelanggan;
        delete payload.url_berkasNPWPPelanggan;
        delete payload.url_berkasNIBPelanggan;
        delete payload.statusPelanggan;
        const data = await UseFetch(
          API_LINK + "RegisterCustomer/EditRegister",
          payload
        );
        console.log("Response Data:", data); // Debugging
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
            navigate("home");
            return;
        }
      } catch (error) {
        console.error("Error during handleAdd execution:", error);
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
      } finally {
        setIsLoading(false);
        console.log("handleAdd completed.");
      }
    }
  };

  //if (isLoading) return <Loading />;
  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <form>
        <div className="card">
          <div
            className="card-header fw-medium text-white text-center"
            style={{ backgroundColor: "#0059ab", fontSize: 16 }}
          >
            FORMULIR REGISTRASI CUSTOMER
          </div>
          <div className="card-body p-4">
            <h5 className="card-title mb-0 pb-2 border-bottom">
              General Information / Informasi Umum
            </h5>
            <br />
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
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="pemilikPerusahaan"
                  label="Pemilik Perusahaan"
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
                  forInput="kodePos"
                  label="Kode Pos"
                  isRequired
                  arrData={listKodePos}
                  value={formDataRef.current.kodePos}
                  onChange={handleInputChange}
                  errorMessage={errors.kodePos}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="email"
                  forInput="emailPelanggan"
                  label="Email Perusahaan"
                  isRequired
                  value={formDataRef.current.emailPelanggan}
                  onChange={handleInputChange}
                  errorMessage={errors.emailPelanggan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  forInput="nomorTeleponPelanggan"
                  label="Nomor HP/Telepon Perusahaan"
                  isRequired
                  value={formDataRef.current.nomorTeleponPelanggan}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorTeleponPelanggan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="faxPelanggan"
                  label="Nomor Fax"
                  isRequired
                  value={formDataRef.current.faxPelanggan}
                  onChange={handleInputChange}
                  errorMessage={errors.faxPelanggan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nomorNPWPPelanggan"
                  label="Nomor NPWP"
                  isRequired
                  value={formDataRef.current.nomorNPWPPelanggan}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorNPWPPelanggan}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="alamatNPWP"
                  label="Alamat NPWP"
                  isRequired
                  value={formDataRef.current.alamatNPWP}
                  onChange={handleInputChange}
                  errorMessage={errors.alamatNPWP}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nomorNIB"
                  label="NIB Perusahaan"
                  isRequired
                  value={formDataRef.current.nomorNIB}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorNIB}
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
                          forInput="tlpPicFinance"
                          label=""
                          isRequired
                          value={formDataRef.current.tlpPicFinance}
                          onChange={handleInputChange}
                          errorMessage={errors.tlpPicFinance}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          forInput="tlpPicTax"
                          label=""
                          isRequired
                          value={formDataRef.current.tlpPicTax}
                          onChange={handleInputChange}
                          errorMessage={errors.tlpPicTax}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          forInput="tlpPicProcurement"
                          label=""
                          isRequired
                          value={formDataRef.current.tlpPicProcurement}
                          onChange={handleInputChange}
                          errorMessage={errors.tlpPicProcurement}
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
                  forInput="berkasNIBPelanggan"
                  label="Berkas NIB (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileNIBRef}
                  onChange={() =>
                    handleFileChange(fileNIBRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasNIBPelanggan}
                  hasExisting={formDataRef.current.berkasNIBPelanggan}
                />
                <Label
                  title={
                    formDataRef.current.url_berkasNIBPelanggan ? (
                      <a
                        href={formDataRef.current.url_berkasNIBPelanggan}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tampilkan Berkas NIB Lama
                      </a>
                    ) : (
                      "Tidak ada lampiran"
                    )
                  }
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasNPWPPelanggan"
                  label="Berkas NPWP (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileNPWPRef}
                  onChange={() =>
                    handleFileChange(fileNPWPRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasNPWPPelanggan}
                  hasExisting={formDataRef.current.berkasNPWPPelanggan}
                />
                <Label
                  title={
                    formDataRef.current.url_berkasNPWPPelanggan ? (
                      <a
                        href={formDataRef.current.url_berkasNPWPPelanggan}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tampilkan Berkas NPWP Lama
                      </a>
                    ) : (
                      "Tidak ada lampiran"
                    )
                  }
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasSKTPelanggan"
                  label="Berkas SKT (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileSKTRef}
                  onChange={() =>
                    handleFileChange(fileSKTRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasSKTPelanggan}
                  hasExisting={formDataRef.current.berkasSKTPelanggan}
                />
                <Label
                  title={
                    formDataRef.current.url_berkasSKTPelanggan ? (
                      <a
                        href={formDataRef.current.url_berkasSKTPelanggan}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tampilkan Berkas SKT Lama
                      </a>
                    ) : (
                      "Tidak ada lampiran"
                    )
                  }
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasSPPKPPelanggan"
                  label="Berkas SPPKP (.pdf, .jpg, .png)"
                  formatFile=".pdf,.jpg,.png"
                  ref={fileSPPKPRef}
                  onChange={() =>
                    handleFileChange(fileSPPKPRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasSPPKPPelanggan}
                  hasExisting={formDataRef.current.berkasSPPKPPelanggan}
                />
                <Label
                  title={
                    formDataRef.current.url_berkasSPPKPPelanggan ? (
                      <a
                        href={formDataRef.current.url_berkasSPPKPPelanggan}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tampilkan Berkas SPPK Lama
                      </a>
                    ) : (
                      "Tidak ada lampiran"
                    )
                  }
                />
              </div>
              <div className="col-lg-3">
                <FileUpload
                  forInput="berkasSIUPPelanggan"
                  label="Berkas SIUP (.pdf, .jpg, .png, .zip)"
                  formatFile=".pdf,.jpg,.png,.zip"
                  ref={fileSIUPRef}
                  onChange={() =>
                    handleFileChange(fileSIUPRef, "pdf,jpg,png,zip")
                  }
                  errorMessage={errors.berkasSIUPPelanggan}
                  hasExisting={formDataRef.current.berkasSIUPPelanggan}
                />
                <Label
                  title={
                    formDataRef.current.url_berkasSIUPPelanggan ? (
                      <a
                        href={formDataRef.current.url_berkasSIUPPelanggan}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tampilkan Berkas SIUP Lama
                      </a>
                    ) : (
                      "Tidak ada lampiran"
                    )
                  }
                />
              </div>
            </div>
            <br></br>
            <div className="col-lg-3">
              <Button
                classType="secondary me-2 px-4 py-2"
                label="KEMBALI"
                style={{ marginRight: "1500px" }}
                onClick={() => onChangePage("index")}
              />
              {/* <Button
                classType="secondary me-2 px-4 py-2"
                label="BATAL"
                onClick={() => navigate("/")}
              /> */}
              <Button
                classType="primary ms-2 px-4 py-2"
                onClick={handleAdd} // Tambahkan onClick untuk memanggil handleAdd
                label="SIMPAN"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
