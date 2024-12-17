import { lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { decryptId } from "../utils/encryptor";
import Cookies from "js-cookie";
import Loading from "../component/Loading";
import PublicLayout from "../component/PublicLayout";
import AdminLayout from "../component/AdminLayout";
const Home = lazy(() => import("../page/home"));
const Contact = lazy(() => import("../page/contact"));
const DataPelanggan = lazy(() => import("../page/admin/data-pelanggan/Index"));
const Login = lazy(() => import("../page/admin/login"));
const Customer = lazy(() => import("../page/customer/Index"));
const CustomerEdit = lazy(() => import("../page/customer/Edit"));
const Logout = lazy(() => import("../page/admin/logout"));
const BerandaC = lazy(() => import("../page/admin/pedoman/Index"));

import Admin from "../page/admin";

const Router = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      const userProfile = decodeURIComponent(user);
      const decrypt = decryptId(userProfile);
      setUser(JSON.parse(decrypt));
      console.log(user.role);
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const createRoute = (path, element, isPrivate = false, roles = []) => ({
    path,
    element:
      isPrivate && loggedIn ? (
        <AdminLayout>{element}</AdminLayout>
      ) : (
        <PublicLayout>{element}</PublicLayout>
      ),
    isPrivate,
    roles,
  });

  const routes = [
    // Public routes
    createRoute("/", <Home />),
    createRoute("/contact", <Contact />),
    createRoute("/login-page", <Login />),
    // createRoute("/instructor", <Instructor />),
    createRoute("/customer", <Customer />, true, [
      "AdminDAKAP",
      "AdminMarketing",
      "Customer",
    ]),

    // Admin routes
    createRoute("/admin", <Admin />, true, [
      "AdminDAKAP",
      "AdminMarketing",
      "Customer",
      "Contributor",
    ]),

    createRoute("/pedoman", <BerandaC />, true, ["Customer"]),

    // createRoute("/logout", <Logout />),
    // createRoute("/403", <Forbidden />),
    // createRoute("/search/:id", <Search />),

    createRoute("*", <Home />),
    createRoute("/customer", <Customer />, true, [
      "AdminDAKAP",
      "AdminMarketing",
    ]),
    createRoute("/customer-edit", <CustomerEdit />, true, [
      "AdminDAKAP",
      "AdminMarketing",
      "Customer",
    ]),
    createRoute("/data-pelanggan", <DataPelanggan />, true, [
      "AdminDAKAP",
      "AdminMarketing",
    ]),
    createRoute("/logout", <Logout />),
  ];

  if (loading) return <Loading />;

  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.isPrivate) {
          if (loggedIn) {
            if (user && route.roles && route.roles.includes(user.role)) {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Navigate to="/403" />}
                />
              );
            }
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/login-page" />}
              />
            );
          }
        } else if (route.path === "/login-page") {
          if (loggedIn) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/admin" />}
              />
            );
          } else {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
        } else {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        }
      })}
    </Routes>
  );
};

export default Router;
