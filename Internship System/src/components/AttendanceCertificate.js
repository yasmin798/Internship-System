import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

const AttendanceCertificate = ({ workshopTitle }) => {
  const [name, setName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef(); // ✅ Add ref for the certificate div

  const handleGenerate = () => {
    if (!name.trim()) {
      alert('Please enter your full name to generate the certificate.');
      return;
    }
    setShowCertificate(true);
  };

  // ✅ Add this new download handler
  const handleDownload = () => {
    if (certificateRef.current) {
      html2pdf().from(certificateRef.current).save(`${name}_Certificate.pdf`);
    }
  };

  return (
    <div className="mt-4">
      <h5>Get Certificate of Attendance</h5>
      <input
        type="text"
        placeholder="Your Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={handleGenerate} className="btn btn-primary">
        Generate Certificate
      </button>

      {showCertificate && (
        <>
          {/* ✅ Attach the ref to the certificate content */}
          <div
            ref={certificateRef}
            className="border p-3 mt-3 bg-light text-center"
            style={{ backgroundColor: 'white', maxWidth: '600px', margin: '0 auto' }}
          >
            <h4>Certificate of Attendance</h4>
            <p>This certifies that</p>
            <h5>{name}</h5>
            <p>attended the workshop</p>
            <strong>{workshopTitle}</strong>
            <p>on {new Date().toLocaleDateString()}</p>
          </div>

          {/* ✅ Add new Download button */}
          <div className="text-center mt-3">
            <button onClick={handleDownload} className="btn btn-success">
              Download as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceCertificate;
