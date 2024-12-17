// user.js
import Cookies from "js-cookie";
import { decryptId } from "./encryptor";

// Ambil data pengguna dari cookie
const userCookie = Cookies.get("user");

// Buat variabel untuk menyimpan data pengguna
let user = null;

// Periksa apakah ada data pengguna di cookie
if (userCookie) {
  // Dekode data pengguna jika perlu
  const userProfile = decodeURIComponent(userCookie);
  const decryptedData = decryptId(userProfile);
  console.log("decryptedData", JSON.parse(decryptedData));

  // Tetapkan data pengguna yang sudah didekripsi ke variabel user
  user = JSON.parse(decryptedData);
}

// Ekspor objek pengguna
export default user;
