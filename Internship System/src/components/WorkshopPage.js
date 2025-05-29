import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function WorkshopPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);  // Ref to the form container

  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      name: 'AI in Industry',
      start: '2025-05-20T10:00',
      end: '2025-05-20T12:00',
      description: 'Exploring AI applications in different sectors.',
      speaker: 'Dr. Salma Youssef',
      agenda: '10:00 - Intro\n10:30 - Case Studies\n11:30 - Q&A',
    },
  ]);

  const [workshopForm, setWorkshopForm] = useState({
    id: null,
    name: '',
    start: '',
    end: '',
    description: '',
    speaker: '',
    agenda: '',
  });

  const handleWorkshopInputChange = (e) => {
    const { name, value } = e.target;
    setWorkshopForm(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkshopFormSubmit = (e) => {
    e.preventDefault();

    if (workshopForm.id) {
      setWorkshops(prev => prev.map(w => (w.id === workshopForm.id ? workshopForm : w)));
    } else {
      const newWorkshop = {
        ...workshopForm,
        id: Date.now(),
      };
      setWorkshops(prev => [...prev, newWorkshop]);
    }

    setWorkshopForm({
      id: null,
      name: '',
      start: '',
      end: '',
      description: '',
      speaker: '',
      agenda: '',
    });
  };

  const handleEditClick = (workshop) => {
    setWorkshopForm(workshop);
    formRef.current.scrollIntoView({ behavior: 'smooth' });  // Scroll to the form
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>✨ Manage Workshops</h1>

      <form ref={formRef} onSubmit={handleWorkshopFormSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={workshopForm.name}
          onChange={handleWorkshopInputChange}
          placeholder="Workshop Name"
          required
          style={styles.input}
        />
        <input
          type="datetime-local"
          name="start"
          value={workshopForm.start}
          onChange={handleWorkshopInputChange}
          required
          style={styles.input}
        />
        <input
          type="datetime-local"
          name="end"
          value={workshopForm.end}
          onChange={handleWorkshopInputChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          value={workshopForm.description}
          onChange={handleWorkshopInputChange}
          placeholder="Description"
          required
          style={styles.textarea}
        />
        <input
          type="text"
          name="speaker"
          value={workshopForm.speaker}
          onChange={handleWorkshopInputChange}
          placeholder="Speaker"
          required
          style={styles.input}
        />
        <textarea
          name="agenda"
          value={workshopForm.agenda}
          onChange={handleWorkshopInputChange}
          placeholder="Agenda"
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.primaryButton}>
          {workshopForm.id ? 'Update' : 'Create'} Workshop
        </button>
      </form>

      <div style={styles.cardsContainer}>
        {workshops.map(workshop => (
          <div key={workshop.id} style={styles.workshopCard}>
            <h3>{workshop.name}</h3>
            <p><strong>Start:</strong> {new Date(workshop.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(workshop.end).toLocaleString()}</p>
            <p><strong>Description:</strong> {workshop.description}</p>
            <p><strong>Speaker:</strong> {workshop.speaker}</p>
            <p><strong>Agenda:</strong><br />{workshop.agenda}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => handleEditClick(workshop)} style={styles.editButton}>Edit</button>
              <button onClick={() => setWorkshops(prev => prev.filter(w => w.id !== workshop.id))} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/scad-dashboard')} style={styles.backButton}>← Back to Dashboard</button>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#D4F1F4',
    padding: '40px',
    minHeight: '100vh',
  },
  header: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#05445E',
  },
  form: {
    display: 'grid',
    gap: '15px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0px 4px 10px rgba(5, 68, 94, 0.1)',
    maxWidth: '600px',
    marginBottom: '40px',
  },
  input: {
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  primaryButton: {
    padding: '10px 20px',
    backgroundColor: '#189AB4',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cardsContainer: {
    display: 'grid',
    gap: '20px',
    maxWidth: '1000px',
  },
  workshopCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '5px 5px 0px #05445E',
    border: '1px solid #05445E',
  },
  editButton: {
    backgroundColor: '#75E6DA',
    color: '#05445E',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#FFDADA',
    color: '#000',
    padding: '8px 14px',
    border: '1px solid #05445E',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  backButton: {
    position: 'absolute',
    top: '10px',      // Adjusted to be closer to the top
    right: '20px',    // Adjusted to be closer to the right edge
    backgroundColor: '#05445E',
    color: '#fff',
    padding: '6px',  // Smaller padding
    border: 'none',
    borderRadius: '8px',   // Slightly rounded corners for a compact look
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '12px',  // Smaller font size
  },
  
};

export default WorkshopPage;