import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard = ({ workshops, feedback }) => {
  const totalWorkshops = workshops.length;
  const liveWorkshops = workshops.filter(w => w.type === 'Live').length;
  const feedbackCount = feedback.length;

  const workshopTypeData = [
    { type: 'Live', count: liveWorkshops },
    { type: 'Pre-recorded', count: totalWorkshops - liveWorkshops },
  ];

  const feedbackData = workshops.map(workshop => ({
    title: workshop.title,
    feedbackCount: feedback.filter(f => f.workshopId === workshop.id).length,
  }));

  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Analytics Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total Workshops</h3>
              <p className="card-text">{totalWorkshops}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Live Workshops</h3>
              <p className="card-text">{liveWorkshops}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total Feedback</h3>
              <p className="card-text">{feedbackCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="h5 mb-3">Workshops by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={workshopTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#36b9cc" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="h5 mb-3">Feedback per Workshop</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={feedbackData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="feedbackCount" fill="#dc3545" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;