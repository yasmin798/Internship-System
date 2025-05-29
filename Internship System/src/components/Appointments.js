import React, { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const Appointments = () => {
  const [scadOnline, setScadOnline] = useState(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);
  const [callIncoming, setCallIncoming] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const [formData, setFormData] = useState({ date: "" });
  // Add inside Appointments component (after useState declarations)

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("startCall") === "true") {
      setAppointmentAccepted(true);
      setScadOnline(true);
      startCall();
    }
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("startCall") === "true") {
      setAppointmentAccepted(true);
      setScadOnline(true);
      startCall();
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true); // <-- Add this
    toast.success(
      `SCAD Office accepted your appointment request on June 18, 2025`,
      { autoClose: 3000 }
    );
    setTimeout(() => setAppointmentConfirmed(true), 500);
  };

  const handleAcceptAppointment = () => {
    setAppointmentConfirmed(false);
    setAppointmentAccepted(true);
    setScadOnline(true);
  };

  const handleRejectAppointment = () => {
    setAppointmentConfirmed(false);
    setAppointmentAccepted(false);
    setCallIncoming(false);
    setScadOnline(false);
  };

  const startCall = () => {
    setIsConnecting(true);
    setCallIncoming(true);
    setIsCameraOn(false);
    setIsMicMuted(false);
    setIsScreenShared(false);
    setTimeout(() => setIsConnecting(false), 2000);
    setTimeout(() => {
      toast.warning("\ud83d\udeaa SCAD Office has left the call", {
        autoClose: 3000,
      });
      setCallIncoming(false);
      setScadOnline(false);
      setAppointmentAccepted(false);
    }, 12000);
  };

  const handleEndCall = () => {
    setCallIncoming(false);
    setScadOnline(false);
    setAppointmentAccepted(false);
    setCallEnded(true); // <-- Add this
    toast.info("📴 You left the call", { autoClose: 3000 });
  };

  return (
    <div className="appointments-container">
      <Sidebar />
      <main className="appointments-main">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <h2 className="appointments-title">Request Appointment</h2>

        {/* Always show the form */}
        <form onSubmit={handleSubmit} className="appointment-form">
          <label className="form-label">
            Preferred Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Request Appointment
          </button>
        </form>

        {/* Show confirmation below the form */}
        {appointmentConfirmed && !callIncoming && (
          <div className="confirmation-banner">
            ✅ SCAD Office has accepted your appointment request for{" "}
            <strong>June 18, 2025</strong>.
            <div className="confirmation-actions">
              <button
                className="primary-button"
                onClick={handleAcceptAppointment}
              >
                Accept
              </button>
              <button
                className="danger-button"
                onClick={handleRejectAppointment}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {appointmentAccepted && !callIncoming && (
          <div className="confirmation-banner">
            <p>🟢 SCAD Office is online and ready for the call.</p>
            <div className="confirmation-actions">
              <button className="primary-button" onClick={startCall}>
                Start Call
              </button>
            </div>
          </div>
        )}

        {callIncoming && (
          <div className="call-container">
            <div className="call-header">
              <h3 className="call-status">
                📞 {isConnecting ? "Connecting..." : "In Call with SCAD Office"}
              </h3>
              <p className="call-description">
                {scadOnline
                  ? "🟢 SCAD Office is online and active in this call."
                  : "🔴 SCAD Office is currently offline."}
              </p>
            </div>

            {!isConnecting && (
              <>
                <div className="call-content">
                  {(isCameraOn || isScreenShared) && (
                    <div className="call-preview-panel">
                      {isCameraOn && (
                        <div className="preview-item">
                          <div className="preview-icon">📷</div>
                          <strong>Your Camera</strong>
                        </div>
                      )}
                      {isScreenShared && (
                        <div className="preview-item">
                          <div className="preview-icon">🖥️</div>
                          <strong>Screen Sharing</strong>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="call-controls">
                    <div className="control-item">
                      <button
                        className={`call-button ${
                          isCameraOn ? "" : "call-button-off"
                        }`}
                        onClick={() => setIsCameraOn(!isCameraOn)}
                      >
                        {isCameraOn ? (
                          <FaVideo size={20} />
                        ) : (
                          <FaVideoSlash size={20} />
                        )}
                      </button>
                      <p className="control-label">
                        {isCameraOn ? "Camera On" : "Camera Off"}
                      </p>
                    </div>

                    <div className="control-item">
                      <button
                        className={`call-button ${
                          isMicMuted ? "call-button-off" : ""
                        }`}
                        onClick={() => setIsMicMuted(!isMicMuted)}
                      >
                        {isMicMuted ? (
                          <FaMicrophoneSlash size={20} />
                        ) : (
                          <FaMicrophone size={20} />
                        )}
                      </button>
                      <p className="control-label">
                        {isMicMuted ? "Muted" : "Unmuted"}
                      </p>
                    </div>

                    <div className="control-item">
                      <button
                        className={`call-button ${
                          isScreenShared ? "" : "call-button-off"
                        }`}
                        onClick={() => setIsScreenShared(!isScreenShared)}
                      >
                        {isScreenShared ? (
                          <MdScreenShare size={20} />
                        ) : (
                          <MdStopScreenShare size={20} />
                        )}
                      </button>
                      <p className="control-label">
                        {isScreenShared ? "Sharing" : "Share Screen"}
                      </p>
                    </div>

                    <div className="control-item">
                      <button
                        className="call-button danger"
                        onClick={handleEndCall}
                      >
                        🔚
                      </button>
                      <p className="control-label">Leave Call</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {!callIncoming &&
          !appointmentConfirmed &&
          !appointmentAccepted &&
          scadOnline === false &&
          callEnded && (
            <div className="confirmation-banner offline">
              🔴 SCAD Office is currently offline.
            </div>
          )}

        <style jsx>{`
          .appointments-container {
            display: flex;
            min-height: 100vh;
            background-color: #f8fafc;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            color: #1e293b;
          }

          .appointments-main {
            flex: 1;
            padding: 2.5rem;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
          }

          .appointments-title {
            font-size: 1.75rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 1.75rem;
            letter-spacing: -0.025em;
          }

          .appointment-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            max-width: 500px;
            margin-bottom: 2rem;
          }

          .form-label {
            color: #334155;
            font-weight: 500;
            font-size: 0.95rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .form-input {
            padding: 0.875rem 1rem;
            border-radius: 0.5rem;
            border: 1px solid #e2e8f0;
            font-size: 0.95rem;
            background-color: #fff;
            color: #334155;
            outline: none;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .form-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .primary-button {
            background-color: #457b9d;
            color: #fff;
            padding: 0.875rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            margin-top: 0.5rem;
          }

          .primary-button:hover {
            background-color: #1a237e;
          }

          .danger-button {
            background-color: #dc2626;
            color: #fff;
            padding: 0.875rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            margin-left: 1rem;
            margin-top: 0.5rem;
          }

          .danger-button:hover {
            background-color: #b91c1c;
          }

          .confirmation-banner {
            background-color: #ecfdf5;
            padding: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid #a7f3d0;
            margin-top: 1rem;
            color: #065f46;
            font-size: 0.95rem;
            line-height: 1.5;
            max-width: 500px;
          }

          .confirmation-banner.offline {
            background-color: #fef2f2;
            border-color: #fecaca;
            color: #991b1b;
          }

          .confirmation-actions {
            margin-top: 1.25rem;
            display: flex;
          }

          .call-container {
            margin-top: 3rem;
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 1rem;
            color: #1e293b;
            text-align: center;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            min-height: 400px;
            display: flex;
            flex-direction: column;
          }

          .call-header {
            margin-bottom: 2rem;
          }

          .call-status {
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
            font-weight: 500;
            color: #1e40af;
          }

          .call-description {
            color: #64748b;
            font-size: 0.95rem;
          }

          .call-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .call-controls {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-top: auto;
            padding-top: 2rem;
          }

          .control-item {
            text-align: center;
            min-width: 80px;
          }

          .call-button {
            background-color: #457b9d;
            color: #fff;
            padding: 1.25rem;
            border-radius: 50%;
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
            width: 4rem;
            height: 4rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .call-button:hover {
            background-color: #1a237e;
            transform: translateY(-1px);
          }

          .call-button.danger {
            background-color: #dc2626;
          }

          .call-button.danger:hover {
            background-color: #b91c1c;
          }

          .call-button-off {
            background-color: #cbd5e1;
            color: #64748b;
          }

          .call-button-off:hover {
            background-color: #94a3b8;
          }

          .control-label {
            margin-top: 0.75rem;
            font-size: 0.875rem;
            color: #64748b;
          }

          .call-preview-panel {
            background-color: #f1f5f9;
            color: #1e293b;
            padding: 1.5rem;
            border-radius: 0.75rem;
            width: 100%;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
            margin-bottom: 2rem;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-left: 2rem;
            margin-right: auto;
            max-width: 70%;
          }

          .preview-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .preview-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          @media (max-width: 768px) {
            .appointments-main {
              padding: 1.5rem;
            }

            .call-controls {
              gap: 1rem;
            }

            .call-container {
              min-height: auto;
              padding: 1.5rem;
            }

            .call-preview-panel {
              min-height: 150px;
              margin-bottom: 1.5rem;
            }
          }
        `}</style>
      </main>
    </div>
  );
};

export default Appointments;
