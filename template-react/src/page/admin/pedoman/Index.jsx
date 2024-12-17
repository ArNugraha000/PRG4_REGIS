import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used

const PedomanIndex = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [dataCorrect, setDataCorrect] = useState(false);
  const navigate = useNavigate(); // React Router navigation function

  const handleCheckboxChange = () => {
    if (agreeTerms && dataCorrect) {
      navigate(`/customer-Edit?id=${Id}`); // Redirect to the "Tambah Customer" page
    }
  };

  return (
    <div className="card">
      <div
        className="card-header fw-medium text-white text-center"
        style={{ backgroundColor: "#0059ab", fontSize: 16 }}
      >
        INFORMASI LAYANAN
      </div>
      <div className="card-body p-4">
        <h5
          className="card-title mb-0 pb-2 border-bottom"
          style={{ textAlign: "center" }}
        >
          SELAMAT DATANG
        </h5>
        <br></br>
        <div
          className="row"
          style={{
            textAlign: "justify",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
          }}
        >
          "Selamat datang di Politeknik Astra, sebuah institusi pendidikan
          tinggi yang berkomitmen untuk mencetak lulusan unggul, berdaya saing
          global, dan siap menghadapi tantangan dunia industri yang semakin
          dinamis. Sebagai lembaga pendidikan yang mengedepankan kualitas, kami
          tidak hanya berfokus pada pengembangan kompetensi teknis, tetapi juga
          karakter dan soft skills yang diperlukan untuk sukses di dunia
          profesional. Kehadiran Anda sebagai customer adalah bagian penting
          dari perjalanan kami untuk terus memberikan layanan terbaik, baik
          dalam bidang pendidikan, pelatihan, maupun pengembangan teknologi.
          Kami percaya bahwa melalui kerja sama yang erat, kami dapat
          bersama-sama meraih visi besar Politeknik Astra untuk menjadi pusat
          keunggulan pendidikan vokasi yang tidak hanya diakui di Indonesia,
          tetapi juga di kancah internasional. Kami sangat mengapresiasi
          kepercayaan yang Anda berikan kepada Politeknik Astra. Kepercayaan ini
          merupakan pondasi bagi kami untuk terus berinovasi dalam mengembangkan
          program-program pendidikan yang relevan dengan kebutuhan industri,
          serta menciptakan lingkungan yang mendukung pertumbuhan dan
          perkembangan setiap individu. Kami yakin bahwa hubungan yang terjalin
          ini tidak hanya akan membawa manfaat bagi kedua belah pihak, tetapi
          juga memberikan kontribusi signifikan bagi kemajuan masyarakat dan
          dunia kerja. Kami berkomitmen untuk memberikan layanan profesional dan
          berdedikasi untuk memenuhi kebutuhan serta harapan Anda, dengan
          senantiasa menjaga kualitas dan standar terbaik dalam setiap aspek
          pelayanan. Bersama Politeknik Astra, mari kita wujudkan masa depan
          yang lebih baik dan lebih cemerlang, menciptakan solusi bagi tantangan
          zaman, dan membangun dunia kerja yang lebih siap menghadapi perubahan
          global. Teruslah bersama kami untuk meraih kesuksesan yang lebih
          besar!"
        </div>
      </div>
      {/* <div className="card-body p-4">
        <h5
          className="card-title mb-0 pb-2 border-bottom"
          style={{ textAlign: "center" }}
        >
          Panduan Teknis
        </h5>
        <br></br>
        <div className="row">
          - Pastikan semua data diisi dengan benar dan sesuai dokumen resmi.
          <br />
          - File lampiran harus dalam format .pdf, .jpg, .png, atau .zip dengan
          ukuran maksimal 10 MB.
          <br />
          - Customer wajib menyediakan dokumen NIB, NPWP, SKT, dan SPPKP sesuai
          permintaan.
          <br />- Email yang digunakan harus aktif untuk proses verifikasi.
        </div>
      </div> */}
      <div
        className="card-body p-4"
        style={{
          textAlign: "justify",
          fontFamily: "Arial, sans-serif",
          fontSize: "20px",
        }}
      >
        <h5 className="card-title mb-0 pb-2 border-bottom">
          Dokumen yang harus dipenuhi
        </h5>
        <br></br>
        <div
          className="row"
          style={{
            textAlign: "justify",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
          }}
        >
          - Dokumen NIB (Nomor induk berusaha).
          <br />
          - Dokumen NPWP (Nomor Pokok Wajib Pajak).
          <br />
          - Dokument SKT (Surat Keterangan Terdaftar).
          <br />
          - Dokumen SPPKP (Surat Pengukuhan Pengusaha Kena Pajak).
          <br />- Dokumen SIUP (Surat Izin Usaha Perdagangan)
        </div>
      </div>
    </div>
  );
};

export default PedomanIndex;
