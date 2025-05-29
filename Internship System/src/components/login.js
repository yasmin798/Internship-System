
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase().replace(/\s/g, "");
    const trimmedPassword = password.trim().replace(/\s/g, "");
    
    console.log("Attempting login with:", { trimmedEmail, trimmedPassword });

    const dummyCredentials = {
      "student@guc.edu.eg": "student123",
      "prostudent@guc.edu.eg": "prostudent123",
      "company@guc.edu.eg": "company123",
      "scad@guc.edu.eg": "scad123",
      "faculty@guc.edu.eg": "faculty123",
    };

    if (
      dummyCredentials[trimmedEmail] &&
      dummyCredentials[trimmedEmail] === trimmedPassword
    ) {
      console.log("Credentials matched, proceeding with login...");
      setError("");
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);

      // Determine and set role and navigate to appropriate dashboard
      if (trimmedEmail === "student@guc.edu.eg") {
        console.log("Navigating to student-dashboard");
        localStorage.setItem("userRole", "student");
        setUserRole("student");
        navigate("/student-dashboard", { replace: true });
      } else if (trimmedEmail === "prostudent@guc.edu.eg") {
        console.log("Navigating to pro-student-dashboard");
        localStorage.setItem("userRole", "prostudent");
        setUserRole("prostudent");
        navigate("/pro-student-dashboard", { replace: true });
      } else if (trimmedEmail === "company@guc.edu.eg") {
        console.log("Navigating to company route under CompanyLayout");
        localStorage.setItem("userRole", "company");
        setUserRole("company");
        navigate("/company", { replace: true });
      } else if (trimmedEmail === "scad@guc.edu.eg") {
        console.log("Navigating to scad-dashboard");
        localStorage.setItem("userRole", "scad");
        setUserRole("scad");
        navigate("/scad-dashboard", { replace: true });
      } else if (trimmedEmail === "faculty@guc.edu.eg") {
        console.log("Navigating to faculty-dashboard");
        localStorage.setItem("userRole", "faculty");
        setUserRole("faculty");
        navigate("/faculty-dashboard", { replace: true });
      } else {
        console.log("Navigating to dashboard (other role)");
        localStorage.setItem("userRole", "other");
        setUserRole("other");
        navigate("/dashboard", { replace: true });
      }
    } else {
      console.log("Invalid credentials");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container slide-up">
      <div className="login-header">
        <span className="vertical-line" />
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
      <p className="forgot-password">Forgot your password?</p>
    </div>
  );
}

export default Login;
