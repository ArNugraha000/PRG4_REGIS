import { useEffect, useRef, useState } from "react";
import { API_LINK } from "../../../util/Constants";
import UseFetch from "../../../util/UseFetch";
import Button from "../../../component/part/Button";
import Label from "../../../component/part/Label";
import Loading from "../../../component/part/Loading";
import Alert from "../../../component/part/Alert";
import { encode as base64Encode, decode as base64Decode } from "base-64";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../../component/part/Input";

export default function DataPelangganDetail({ onChangePage, withID }) {
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalPass, setShowModalPass] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formDataRef = useRef({
    kodePelanggan: "",
    namaPerusahaan: "",
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
    statusPelanggan: "",
  });

  const passwordBaruRef = useRef();

  const fullAddress = `${
    formDataRef.current.alamatPerusahaan || "Alamat tidak tersedia"
  }
  ${formDataRef.current.kelurahanPerusahaan || "Kelurahan tidak tersedia"}
  ${formDataRef.current.kecamatanPerusahaan || "Kecamatan tidak tersedia"}
  ${formDataRef.current.kabupatenPerusahaan || "Kabupaten tidak tersedia"}
  ${formDataRef.current.provinsiPerusahaan || "Provinsi tidak tersedia"}
  ${formDataRef.current.kodePos || "Kode Pos tidak tersedia"}`;

  const modalStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  };

  const contentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "500px",
    maxWidth: "90%",
  };

  // Schema validasi menggunakan yup
  const userSchema = yup.object().shape({
    passwordBaru: yup
      .string()
      .required("Harus diisi dengan benar")
      .min(8, "Harus minimal 8 karakter")
      .matches(/[a-z]/, "Harus mengandung huruf kecil")
      .matches(/[A-Z]/, "Harus mengandung huruf besar")
      .matches(/[0-9]/, "Harus mengandung angka")
      .matches(/[@$!%*?&]/, "Harus mengandung (@$!%*?&)"),
  });

  const handleInputChange = async (e) => {
    const { value } = e.target;
    passwordBaruRef.current = value; // Simpan nilai di ref
    try {
      await userSchema.validateAt("passwordBaru", { passwordBaru: value }); // Validasi field password
      setErrors(""); // Hapus error jika validasi berhasil
    } catch (err) {
      setErrors(err.message); // Set error dari validasi
    }
  };

  const handleKirimEmail = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalPass(false);
  };

  const handleKirim = () => {
    sweetAlert("Sukses", "Email Berhasil Dikirimkan", "success");
    sendRegistrationEmail(keterangan);
    setShowModal(false);
  };

  const handleEditPassword = () => {
    setShowModalPass(true);
  };

  const handleSimpanPassword = () => {
    sendEditPassword();
    setShowModalPass(false);
  };

  const sendEditPassword = async () => {
    try {
      // Validasi ulang sebelum mengirim

      // Kirim data ke API dengan 2 parameter
      const response = await fetch(
        API_LINK + "RegisterCustomer/GetDataRegisterEditById",
        {
          method: "POST", // Ganti dengan "PUT" jika diperlukan
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: withID, // Parameter ID (ganti dengan ID dinamis jika ada)
            password: passwordBaruRef.current, // Parameter Password
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengupdate data. Silakan coba lagi.");
      }

      const data = await response.json();

      // Berhasil
      console.log("Data berhasil diperbarui:", data);
      sweetAlert("Sukses", "Password Berhasil DiUbah", "success");
    } catch (error) {
      // Tangani error
      console.error("Error:", error);
      sweetAlert(error.message || "Terjadi kesalahan, silakan coba lagi.");
    }
  };

  // Function to encode the ID
  const encodeId = (id) => base64Encode(id.toString());

  // Modify your sendRegistrationEmail function to include the encoded ID
  const sendRegistrationEmail = async (keterangan) => {
    const encodedId = encodeId(formDataRef.current.idPelanggan);
    console.log("Current formData:", formDataRef.current); // Logging untuk debugging

    try {
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
          <p>
            Harap melakukan REGISTRASI ULANG untuk perbaikan data, dikarenakan terdapat data yang TIDAK VALID. 
            Untuk melakukan perubahan data dapat melalui link dibawah ini 
          </p>
          <p>
            <a href=" ">Registrasi Ulang</a>
          </p>
          <p>Keterangan: ${keterangan}</p>
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

  useEffect(() => {
    const fetchData = async (retries = 3, delay = 1000) => {
      let success = false;

      for (let i = 0; i < retries; i++) {
        setIsError({ error: false, message: "" });

        try {
          const response = await UseFetch(
            API_LINK + "RegisterCustomer/GetDataRegisterById",
            { id: withID }
          );

          if (response.length !== 0) {
            formDataRef.current = { ...formDataRef.current, ...response[0] };
            success = true;
            break; // Keluar dari loop jika data berhasil diambil
          }

          if (response === "ERROR" || response.length === 0) {
            throw new Error(
              "Terjadi kesalahan: Gagal mengambil data pelanggan."
            );
          }
        } catch (error) {
          setIsError({ error: true, message: error.message });
          await new Promise((res) => setTimeout(res, delay)); // Tunggu sebelum retry
        } finally {
          setIsLoading(false);
        }
      }

      if (!success) {
        setIsError({
          error: true,
          message: "Gagal mengambil data setelah beberapa kali percobaan.",
        });
      }

      // Tambahkan kondisi untuk memeriksa apakah idPelanggan ada sebelum mengirim email
      if (formDataRef.current.idPelanggan) {
        sendRegistrationEmail("Data yang tidak valid ditemukan.");
      } else {
        console.error("ID tidak ditemukan. Email tidak akan dikirim.");
      }
    };

    if (withID) {
      fetchData();
    }
  }, [withID]);

  if (isLoading) return <Loading />;

  return (
    <>
      {/* {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )} */}
      <div className="card">
        <div className="card-header bg-primary fw-medium text-white">
          INFORMASI UMUM PERUSAHAAN
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-3">
              <Label
                forLabel="kodePelanggan"
                title="Kode Pelanggan"
                data={formDataRef.current.kodePelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="namaPerusahaan"
                title="Nama Perusahaan"
                data={formDataRef.current.namaPerusahaan}
              />
            </div>
            <div
              className="col-lg-3"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Label
                forLabel="alamatPerusahaan"
                title="Alamat Perusahaan"
                data={formDataRef.current.alamatPerusahaan}
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  fullAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: "0.5em", // Jarak ke kanan dari teks
                  marginTop: "1.1em", // Menurunkan ikon sedikit ke bawah
                }}
              >
                <i className="bi bi-link-45deg text-primary fs-5"></i>
                <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
                  rel="stylesheet"
                />
              </a>
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="alamatInvoice"
                title="Alamat Invoice"
                data={formDataRef.current.alamatInvoice}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="provinsiPerusahaan"
                title="Provinsi"
                data={formDataRef.current.provinsiPerusahaan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="kabupatenPerusahaan"
                title="Kabupaten"
                data={formDataRef.current.kabupatenPerusahaan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="kecamatanPerusahaan"
                title="Kecamatan"
                data={formDataRef.current.kecamatanPerusahaan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="kelurahanPerusahaan"
                title="Kelurahan"
                data={formDataRef.current.kelurahanPerusahaan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="kodePos"
                title="Kode Pos"
                data={formDataRef.current.kodePos}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="nomorTeleponPelanggan"
                title="Nomor HP/Telepon"
                data={formDataRef.current.nomorTeleponPelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="faxPelanggan"
                title="Nomor Fax"
                data={formDataRef.current.faxPelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="emailPelanggan"
                title="Email"
                data={formDataRef.current.emailPelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="nomorNPWPPelanggan"
                title="Nomor NPWP"
                data={formDataRef.current.nomorNPWPPelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="alamatNPWP"
                title="Alamat NPWP"
                data={formDataRef.current.alamatNPWP}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="nomorNIB"
                title="NIB"
                data={formDataRef.current.nomorNIB}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="alamatInvoice"
                title="Alamat Invoice"
                data={formDataRef.current.alamatInvoice}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header bg-primary fw-medium text-white">
          INFORMASI LAINNYA
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-3">
              <Label
                forLabel="namaPicFinance"
                title="Nama PIC Finance"
                data={formDataRef.current.namaPicFinance}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="tlpPicFinance"
                title="Nomor HP/Telepon PIC Finance"
                data={formDataRef.current.tlpPicFinance}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="emailPicFinance"
                title="Email PIC Finance"
                data={formDataRef.current.emailPicFinance}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="namaPicTax"
                title="Nama PIC Tax"
                data={formDataRef.current.namaPicTax}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="tlpPicTax"
                title="Nomor HP/Telepon PIC Tax"
                data={formDataRef.current.tlpPicTax}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="emailPicTax"
                title="Email PIC Tax"
                data={formDataRef.current.emailPicTax}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="namaPicProcurement"
                title="Nama PIC Procurement"
                data={formDataRef.current.namaPicProcurement}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="tlpPicProcurement"
                title="Nomor HP/Telepon PIC Procurement"
                data={formDataRef.current.tlpPicProcurement}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="emailPicProcurement"
                title="Email PIC Procurement"
                data={formDataRef.current.emailPicProcurement}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="berkasNIBPelanggan"
                title="Berkas NIB"
                data={
                  formDataRef.current.berkasNIBPelanggan.replace("-", "") ===
                  "" ? (
                    "-"
                  ) : (
                    <a
                      href={
                        API_LINK +
                        "files/download/" +
                        formDataRef.current.berkasNIBPelanggan
                      }
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unduh berkas
                    </a>
                  )
                }
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="berkasNPWPPelanggan"
                title="Berkas NPWP"
                data={
                  formDataRef.current.berkasNPWPPelanggan.replace("-", "") ===
                  "" ? (
                    "-"
                  ) : (
                    <a
                      href={
                        API_LINK +
                        "files/download/" +
                        formDataRef.current.berkasNPWPPelanggan
                      }
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unduh berkas
                    </a>
                  )
                }
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="berkasSKTPelanggan"
                title="Berkas SKT"
                data={
                  formDataRef.current.berkasSKTPelanggan.replace("-", "") ===
                  "" ? (
                    "-"
                  ) : (
                    <a
                      href={
                        API_LINK +
                        "files/download/" +
                        formDataRef.current.berkasSKTPelanggan
                      }
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unduh berkas
                    </a>
                  )
                }
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="berkasSPPKPPelanggan"
                title="Berkas SPPKP"
                data={
                  formDataRef.current.berkasSPPKPPelanggan.replace("-", "") ===
                  "" ? (
                    "-"
                  ) : (
                    <a
                      href={
                        API_LINK +
                        "files/download/" +
                        formDataRef.current.berkasSPPKPPelanggan
                      }
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unduh berkas
                    </a>
                  )
                }
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="berkasSIUPPelanggan"
                title="Berkas SIUP"
                data={
                  formDataRef.current.berkasSIUPPelanggan.replace("-", "") ===
                  "" ? (
                    "-"
                  ) : (
                    <a
                      href={
                        API_LINK +
                        "files/download/" +
                        formDataRef.current.berkasSIUPPelanggan
                      }
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unduh berkas
                    </a>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="float-end my-4 mx-1">
        <Button
          classType="primary px-4 py-2"
          label="Edit Password"
          style={{ marginRight: "1200px" }}
          onClick={handleEditPassword}
        />
        <Button
          classType="secondary px-4 py-2"
          label="KEMBALI"
          style={{ marginRight: "10px" }}
          onClick={() => onChangePage("index")}
        />
        <Button
          classType="primary px-4 py-2"
          label="KIRIM EMAIL"
          onClick={handleKirimEmail}
        />
      </div>
      {showModal && (
        <div className="aria-modal" style={modalStyles}>
          <div className="aria-modal-content" style={contentStyles}>
            <span
              className="close"
              onClick={handleCloseModal}
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "24px",
                padding: "8px",
              }}
            >
              &times;
            </span>
            <br></br>
            <h4>Keterangan</h4>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Masukkan keterangan..."
              rows={4}
              cols={50}
              style={{
                width: "100%",
                borderRadius: "8px", // Membuat sudut melengkung
                border: "1px solid #A9A9A9", // Border abu-abu gelap
                backgroundColor: "#ffffff", // Warna putih untuk background
                padding: "8px",
                color: "#000000", // Warna teks hitam
              }}
            ></textarea>
            <Button
              classType="primary px-4 py-1"
              label="KIRIM"
              onClick={handleKirim}
            />
          </div>
        </div>
      )}
      {showModalPass && (
        <div className="aria-modal" style={modalStyles}>
          <div className="aria-modal-content" style={contentStyles}>
            <span
              className="close"
              onClick={handleCloseModal}
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "25px",
                padding: "8px",
              }}
            >
              &times;
            </span>
            <h4>Ganti Password Baru</h4>
            <div className="input-group" style={{ marginBottom: "12px" }}>
              <Input
                type={showPassword ? "text" : "password"}
                label="Password Baru"
                forInput="password"
                placeholder="Masukkan password baru"
                ref={passwordBaruRef} // Menggunakan ref
                isRequired
                errorMessage={errors} // Menampilkan pesan error
                onChange={handleInputChange} // Validasi real-time
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
            <button
              onClick={handleSimpanPassword}
              style={{
                backgroundColor: "#007bff", // Warna biru untuk tombol
                color: "#ffffff", // Warna putih untuk teks tombol
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Perbarui
            </button>
          </div>
        </div>
      )}
    </>
  );
}
