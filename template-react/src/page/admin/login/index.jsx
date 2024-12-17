import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { number, object, string } from "yup";
import {
  validateAllInputs,
  validateInput,
} from "../../../component/form/ValidateForm";
import { fetchData, postData, sendData } from "../../../api/ApiServices";
import Loading from "../../../component/Loading";
import Cookies from "js-cookie";
import { encryptId } from "../../../utils/encryptor";
import Logo from "../../../assets/IMG_Logo.png";
import axios from "axios";
import { encode as base64Encode, decode as base64Decode } from "base-64";

const token = import.meta.env.VITE_TOKEN;

const Login = () => {
  const [activeTab, setActiveTab] = useState("Customer");
  const [role, setRole] = useState(null);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formDataRef = useRef({
    username: "",
    password: "",
  });

  const [isCorrect, setIsCorrect] = useState(true);

  const userSchema = object({
    username: string().required(),
    password: string().required(),
  });
  const handleLogin = async (e) => {
    e.preventDefault();

    //CODE
    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setLoading(true);

      axios
        .post(
          "http://localhost:5143/api/Utilities/Login",
          {
            username: formDataRef.current.username,
            password: formDataRef.current.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);

          const data = Array.isArray(response.data) ? response.data[0] : null; // Gunakan null jika bukan array

          let userInfo = null; // Deklarasikan userInfo di luar blok if-else
          console.log(data);

          if (
            response.data.Status === "LOGIN SUCCESS" ||
            (data && data.Status === "LOGIN SUCCESS")
          ) {
            if (!data) {
              userInfo = {
                username: response.data.username,
                role: response.data.role,
                nama: response.data.name,
                id: response.data.id,
              };
            } else {
              userInfo = {
                username: data.username,
                role: data.role,
                nama: data.name,
                id: data.id,
              };
            }

            const withId = response.data.id;
            // Simpan role ke state
            setRole(userInfo.role);

            // Simpan userInfo ke cookie
            const user = encryptId(JSON.stringify(userInfo));
            Cookies.set("user", user, { expires: 1 });

            // Redirect sesuai dengan role
            if (
              userInfo.role === "AdminDAKAP" ||
              userInfo.role === "AdminMarketing"
            ) {
              window.location.href = "/admin";
            } else if (userInfo.role === "Customer") {
              // Redirect ke /customer-Edit dengan query string
              const Id = base64Encode(withId); // Menghindari karakter ilegal
              window.location.href = `/customer-Edit?id=${Id}`;
            } else {
              window.location.href = "/login-page";
            }
          } else {
            setIsCorrect(false);
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    console.log(validationError);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
    formDataRef.current[name] = value;
  };

  if (loading) return <Loading />;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              <img
                src={Logo}
                alt="Logo"
                style={{
                  maxWidth: "70%",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              />
            </Typography>
            <Grid container spacing={2} direction="column">
              <div className="align-self-center text-center">
                {/* <label className="fw-bold mb-2">Login as</label> */}
                <br />
                <div className="tab-buttons">
                  {/* <button
										className={activeTab === "Admin" ? "active" : ""}
										onClick={() => handleTabClick("Admin")}
									>
										
									</button> */}
                  {/* <button
										className={activeTab === "Contributor" ? "active" : ""}
										onClick={() => handleTabClick("Contributor")}
									>
										Contributor
									</button> */}
                </div>
              </div>
              <Grid item>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  error={errors.username ? true : false}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  onChange={handleInputChange}
                  error={errors.password ? true : false}
                  fullWidth
                />
              </Grid>
              {!isCorrect && (
                <Grid item>
                  <label className="text-danger" style={{ fontSize: "12px" }}>
                    Username or password incorrect!
                  </label>
                </Grid>
              )}

              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  Marketing dan Finance
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;

// if (Object.values(validationErrors).every((error) => !error)) {
//   setLoading(true);

//   axios
//     .post(
//       "http://localhost:5143/api/Utilities/Login",
//       {
//         username: formDataRef.current.username,
//         password: formDataRef.current.password,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((response) => {
//       console.log(response.data);
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;

//       // Pastikan status login berhasil
//       if (data.Status === "LOGIN SUCCESS") {
//         const userInfo = {
//           username: data.username,
//           role: data.role,
//           nama: data.name,
//         };

//         // Simpan role ke state
//         setRole(data.role);

//         // Simpan userInfo ke cookie
//         let user = encryptId(JSON.stringify(userInfo));
//         Cookies.set("user", user, { expires: 1 });

//         // Redirect sesuai dengan role
//         if (data.role === "AdminDAKAP" || data.role === "AdminMarketing") {
//           window.location.href = "/admin";
//         } else if (data.role === "Customer") {
//           window.location.href = "/admin"; // Ganti sesuai dengan tujuan yang benar
//         } else {
//           window.location.href = "/customer"; // Ganti sesuai dengan tujuan yang benar
//         }
//       } else {
//         setIsCorrect(false);
//       }
//     })
//     .catch((error) => {
//       console.error("Login error:", error);
//     })
//     .finally(() => setLoading(false));
// }
// };

//   fetchLogin("Login", {
//     params: {
//       // username: formDataRef.current.username, // Username dari form input
//       // password: formDataRef.current.password, // Password dari form input
//       ...formDataRef.current,
//       role: activeTab,
//     },
//   })
//     .then((response) => {
//       console.log(response);
//       if (response.length > 0) {
//         const userInfo = {
//           // username: response.username, // Diambil dari backend
//           // role: response.role, // Diambil dari backend

//           //kode sbelumnya
//           username: response[0].usr_username,
//           role: response[0].usr_role,
//           // nama: response[0].nama,
//         };
//         let user = encryptId(JSON.stringify(userInfo));
//         Cookies.set("user", user, { expires: 1 });
//         window.location.href = "/admin";
//       } else {
//         setIsCorrect(false);
//       }
//     })
//     .finally(() => setLoading(false));
