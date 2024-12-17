import Cookies from "js-cookie";
import React, { useEffect } from "react";

const Logout = () => {
  Cookies.remove("user");

  window.location.href = "/login";
};

export default Logout;
