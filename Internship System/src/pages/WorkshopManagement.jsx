import React, { useContext, useState } from 'react';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';
import WorkshopDetails from '../components/WorkshopDetails';
import { WorkshopContext } from '../context/WorkshopContext';
import * as api from '../services/api';

const WorkshopManagement = () => {
  const { workshops, setWorkshops, notifications, setNotifications } = useContext(WorkshopContext);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleAddWorkshop = async (workshop) => {
    const newWorkshop = { ...workshop, id: Date.now() };
    await api.addWorkshop(newWorkshop);
    setWorkshops([...workshops, newWorkshop]);
    setNotifications([
      ...notifications,
      { message: `New workshop created: ${workshop.title}`, timestamp: new Date().toISOString() },
    ]);
  };

  const handleDeleteWorkshop = async (id) => {
    await api.deleteWorkshop(id);
    setWorkshops(workshops.filter(workshop => workshop.id !== id));
    if (selectedWorkshop && selectedWorkshop.id === id) {
      setSelectedWorkshop(null); // Clear selection if deleted
    }
  };

  return (
    <div className="p-4">
      <h2 className="h4 mb-4">Manage Workshops</h2>
      <WorkshopForm onSubmit={handleAddWorkshop} />
      <div className="row">
        <div className="col-md-6">
          <WorkshopList
            workshops={workshops}
            onSelect={setSelectedWorkshop}
            onDelete={handleDeleteWorkshop}
          />
        </div>
        <div className="col-md-6">
          {selectedWorkshop && <WorkshopDetails workshop={selectedWorkshop} />}
        </div>
      </div>
    </div>
  );
};

export default WorkshopManagement;