import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [redirect, setRedirect] = useState(false); // To handle navigation

  // Handle form input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://localhost:7127/api/Account/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.tokenString);
      setLoginStatus("Logged in");
      setRedirect(true); // Set redirect to true after successful login
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setLoginStatus("Login failed. Please try again.");
    }
  };

  // Redirect on successful login
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <div
        className="row w-75 g-0 rounded-3 shadow-lg flex-column flex-md-row"
        style={{ maxWidth: "1200px" }}
      >
        {/* Tagline */}
        <div
          className="slogan text-white"
        
        >
          Connect, Care, Cure: Your <span className="Path2Health">Path2Health</span> Starts Here
        </div>

        {/* Left Column - Form */}
        <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-white rounded-3">
          <h1 className="text-center text-primary mb-4">{t("Login")}</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t("Email Address")}
            </label>
            <input
              type="email"
              className="form-control rounded-3"
              id="exampleInputEmail1"
              placeholder={t("Enter Your Email")}
              value={email}
              onChange={handleEmailChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              {t("We'll never share your information with anyone else")}
            </small>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              {t("Password")}
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              id="exampleInputPassword1"
              placeholder={t("Enter Your Password")}
              autoComplete="off"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid">
            <button
              type="button"
              className="login-btn"
              
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              onClick={handleLogin}
            >
              {t("Login")}
            </button>
          </div>

          {/* Display login status */}
          {loginStatus && (
            <div
              className="mt-3 text-center"
              style={{
                color: loginStatus === "Logged in" ? "green" : "red",
              }}
            >
              {loginStatus}
            </div>
          )}
        </div>

        {/* Right Column - Image */}
        <div className="col-md-6 d-none d-md-block">
          <div
            className=" loginimg h-100 w-100"
            
          ></div>
        </div>
      </div>
    </div>
  );
}
