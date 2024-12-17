import React, { useEffect } from "react";
import ImageSlider from "../../component/ImageSlider";
import LogoSlider from "../../component/LogoSlider";
import SectionTitle from "./SectionTitle";
import CardArticle from "./CardArticle";
import { fetchDataAndSetState } from "../../api/ApiServices";
import { Link } from "react-router-dom";
import Loading from "../../component/Loading";
import CardEvent from "./CardEvent";
import Background2 from "../../assets/svg/background-2.png";
import Background3 from "../../assets/svg/background-3.png";
import BackgroundRegister from "../../assets/svg/1.png";
import Cookies from "js-cookie";

const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const [dataBanner, setDataBanner] = React.useState([]);
  const [dataTraining, setDataTraining] = React.useState([]);

  Cookies.remove("user");
  // Cek jika halaman sudah di-refresh sebelumnya
  if (!localStorage.getItem("refreshed")) {
    // Set localStorage agar halaman tidak di-refresh lagi setelah ini
    localStorage.setItem("refreshed", "true");

    // Lakukan refresh halaman
    window.location.reload();
  }

  useEffect(() => {
    fetchDataAndSetState("getBannerGuest", setDataBanner).then(() =>
      setLoading(false)
    );
  }, []);

  const logos = [
    "https://www.kppmining.com/assets/images/logo.svg",
    "https://www.openkerja.id/wp-content/uploads/2023/06/Lowongan-Kerja-PT-Mesin-Isuzu-Indonesia-500x400.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyD_bX2hdyNJcK3qArXXHYOT94bCC2EWHwTSf0faZSw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMnht8lL2waTLZGxKLaVJw5c8ppTr32GeYazrIzgO&s",
    "https://ik.imagekit.io/zlt25mb52fx/ahmcdn/assets/images/logo/ahm.svg",
    "https://api.polytechnic.astra.ac.id:2906/operational_api/Uploads/logotegal.png",
    "https://ydba.astra.co.id/cfind/source/images/logo/logo@2x.png",
    "https://res.cloudinary.com/astra-infra/image/upload/v1656411427/logo_vsg8cr.png",
    "https://www.flowserve.com/themes/custom/flowserve/logo.svg",
    "https://en.ad-asahidenso.co.jp/uploads/op-asahidenso/en-logo.png",
    "https://www.cabinindo.co.id/wp-content/uploads/2020/01/logo-cabinindo-300x300-1.png",
    "https://media.licdn.com/dms/image/C510BAQGGtbt50EQuSA/company-logo_200_200/0/1630625569870?e=2147483647&v=beta&t=KpI8YwTpn7s4KXh-01n0t57yUBYqHMhDH5PD2nAOOZg",
    "https://web.globalservice.co.id/wp-content/uploads/2023/07/cropped-download-removebg-preview-2-1.png",
    "https://cdn1-production-images-kly.akamaized.net/NHnCB98ACEB0G1Ew-C6dzygJIGE=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4263398/original/090937000_1671176624-logo_PT_Musashi_Auto_Parts.jpg",
    "https://senzofm.co.id/wp-content/uploads/2021/11/cropped-logo-senzo-01.jpg",
    "https://fdrtire.com/assets/frontend/img/logo.jpg",
    "https://patria.co.id/img/head_image.png",
    "https://id.yamaha.com/id/common/images/yamaha_purple.svg",
    "https://vr.utschool.sch.id/assets/img/logo.png",
    "https://yt3.googleusercontent.com/ytc/AIdro_l-JJGmvMslXufXB852xcXemNcElrRs-0St6g95zkck01k=s176-c-k-c0x00ffffff-no-rj",
  ];

  const dataImage = [
    { ban_gambar: "gambar1.jpeg" },
    { ban_gambar: "gambar2.jpeg" },
    { ban_gambar: "gambar3.jpeg" },
    { ban_gambar: "gambar4.jpg" },
  ];

  if (loading) return <Loading />;

  return (
    <div>
      {/* <ImageSlider images={dataBanner} type="banner" /> */}
      <img
        src={BackgroundRegister}
        alt="BackgroundRegister"
        style={{ width: "100%" }}
      />
      <div
        style={{
          backgroundImage: `url(${Background2})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container p-5">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <ImageSlider images={dataImage} type="content" />
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="mb-4">
                <h2 className="display-4 fw-bold text-center color-primary">
                  Unleash Your Abilities
                </h2>
              </div>
              <p className="lead">
                Step into the realm of training and production, where innovation
                meets execution in perfect synergy. Dive into our platform to
                discover the core skills and methodologies essential for
                thriving in your industry.
              </p>
              <p>
                From interactive workshops to hands-on modules, our program
                offers a comprehensive learning experience tailored to empower
                you at every turn. Join us on a journey of advancement and
                refinement, together unlocking new realms of success and
                proficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${Background3})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container px-5 ">
          <div className="py-3 d-flex justify-content-between align-items-center">
            <h4>Article</h4>
            <button className="btn   shadow-lg rounded-pill">
              <Link to="/article" className="color-primary">
                Explore More
              </Link>
            </button>
          </div>
          <CardArticle />
        </div>

        <SectionTitle title="Customers">
          <div className="align-items-center justify-content-center my-5">
            <LogoSlider logos={logos} />
          </div>
        </SectionTitle>

        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
