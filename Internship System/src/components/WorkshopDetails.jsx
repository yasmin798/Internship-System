import React, { useContext, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import LiveCallUI from "./LiveCallUI";
import LiveChat from "./LiveChat";
import { WorkshopContext } from "../context/WorkshopContext";
import AttendanceCertificate from "./AttendanceCertificate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkshopDetails = ({ workshop }) => {
  const { setNotifications } = useContext(WorkshopContext);
  const [notes, setNotes] = useState("");

  if (!workshop) return null;

  const handleRegister = () => {
    setNotifications((prev) => [
      ...prev,
      {
        message: `You registered for ${workshop.title}`,
        timestamp: new Date().toISOString(),
      },
    ]);
    toast.success(
      "✅ Upcoming registered workshop around the corner,Stay tuned!"
    );
  };

  return (
    <div className="p-4" style={styles.container}>
      <h2 className="h4 mb-3">{workshop.title}</h2>
      <p>
        <strong>Date:</strong> {new Date(workshop.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Type:</strong> {workshop.type}
      </p>
      {workshop.presenter && (
        <p>
          <strong>Presenter:</strong> {workshop.presenter}
        </p>
      )}
      {workshop.description && (
        <p>
          <strong>Description:</strong> {workshop.description}
        </p>
      )}
      {workshop.agenda && (
        <p>
          <strong>Agenda:</strong> {workshop.agenda}
        </p>
      )}

      {workshop.type === "Pre-recorded" ? (
        <>
          <VideoPlayer workshopId={workshop.id} />
          <div className="mt-4">
            <h5>My Notes</h5>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-control"
              rows="5"
              placeholder="Take notes while attending..."
            />
          </div>
        </>
      ) : (
        <div style={styles.liveContainer}>
          <div style={styles.liveCall}>
            <LiveCallUI workshopId={workshop.id} />
          </div>
          <div style={styles.liveSidebar}>
            <LiveChat
              userName="You"
              onUserMessage={() => {
                setTimeout(() => {
                  const reply = {
                    user: "Attendee",
                    text: "Hi:)",
                    timestamp: new Date(),
                  };
                  const event = new CustomEvent("attendee-reply", {
                    detail: reply,
                  });
                  window.dispatchEvent(event);
                  toast.info("💬 Attendee replied to your message!");
                }, 1000);
              }}
            />

            <div className="mt-4">
              <h5>My Notes</h5>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-control"
                rows="5"
                placeholder="Take notes while attending..."
              />
            </div>
          </div>
        </div>
      )}

      <button onClick={handleRegister} className="btn btn-success mt-3">
        Register
      </button>

      <AttendanceCertificate workshopTitle={workshop.title} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  liveContainer: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  liveCall: {
    flex: "2",
    minWidth: "300px",
  },
  liveSidebar: {
    flex: "1",
    minWidth: "300px",
  },
};

export default WorkshopDetails;
