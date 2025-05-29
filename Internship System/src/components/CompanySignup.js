import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    companyEmail: "",
  });
  const [logo, setLogo] = useState(null);
  const [documents, setDocuments] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleDocumentsUpload = (e) => {
    setDocuments(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Registration Submitted:", {
      ...formData,
      logo,
      documents,
    });
    alert("Company Registered Successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-container slide-up">
      <div className="signup-header">
        <span className="vertical-line" />
        <h2>Company Registration</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Company Size</label>
          <input
            type="text"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Official Company Email</label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Company Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>

        <div className="form-group">
          <label>Upload Legal Documents (e.g., Tax ID)</label>
          <input type="file" onChange={handleDocumentsUpload} />
        </div>

        <button type="submit">Register Company</button>
      </form>
    </div>
  );
};

export default CompanySignup;
