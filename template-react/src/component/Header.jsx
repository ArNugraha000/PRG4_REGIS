import React, { useRef, useState } from "react";
import "../style/Component.css";
import Menu from "./Menu";
import { COLOR_PRIMARY } from "../utils/constant";
import Logo from "../assets/IMG_Logo.png";
import WhiteLogo from "../assets/IMG_Logo_white.png";
import SatuIndonesia from "../assets/IMG_LogoSatuIndonesia.png";

function Header({ handleToggleModal }) {
  return (
    <div className="bg-p">
      <div className="nav-mobile">
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="container-fluid px-5">
            <div className="navbar-brand">
              <img
                src={Logo}
                alt="Logo Politeknik Astra"
                style={{ height: "45px" }}
              ></img>
            </div>
            <Menu />
          </div>
        </nav>
      </div>

      <div className="nav-dekstop">
        <div style={{ backgroundColor: COLOR_PRIMARY }}>
          <div className="container py-3 px-5">
            <div className="row align-items-center">
              <div className="col-12 col-md-4 mb-2 mb-md-0 text-center text-md-start">
                <img
                  src={WhiteLogo}
                  alt="Logo"
                  height="45"
                  className="d-none d-md-inline d-inline-block align-top"
                />
              </div>
              <div id="tagline" className="col-12 col-md-4 header-align">
                <span
                  style={{ fontSize: 19, color: "#fff" }}
                  className="fw-bold"
                >
                  CUSTOMER REGISTRATION SYSTEM
                </span>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-end">
                <img
                  src={SatuIndonesia}
                  alt="Logo"
                  height="45"
                  className="d-none d-md-inline d-inline-block align-top"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="toogleMenu" className="bg-p">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container d-flex justify-content-between align-items-center">
              <Menu />
              {/* <button className="btn" onClick={handleToggleModal}>
								<i className="fi fi-br-search"></i>
							</button> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Header;
