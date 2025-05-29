import React, { useState } from 'react';

const WorkshopForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [date, setDate] = useState(initialData.date || '');
  const [type, setType] = useState(initialData.type || 'Live');
  const [description, setDescription] = useState(initialData.description || '');
  const [presenter, setPresenter] = useState(initialData.presenter || '');
  const [agenda, setAgenda] = useState(initialData.agenda || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) {
      alert('Please fill in both title and date.');
      return;
    }

    onSubmit({
      ...initialData,
      title,
      date,
      type,
      description,
      presenter,
      agenda,
      feedback: initialData.feedback || [],
    });

    if (!initialData.id) {
      setTitle('');
      setDate('');
      setType('Live');
      setDescription('');
      setPresenter('');
      setAgenda('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="h4 mb-4">{initialData.id ? 'Edit Workshop' : 'Add Workshop'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Workshop Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option>Live</option>
            <option>Pre-recorded</option>
          </select>
        </div>
        <div className="mb-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Workshop Description"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={presenter}
            onChange={(e) => setPresenter(e.target.value)}
            placeholder="Presenter Name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            placeholder="Workshop Agenda"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {initialData.id ? 'Update' : 'Add'} Workshop
        </button>
      </form>
    </div>
  );
};

export default WorkshopForm;




