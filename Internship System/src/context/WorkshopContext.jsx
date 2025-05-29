
import React, { createContext, useState, useEffect } from 'react';
import * as api from '../services/api';

export const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const workshopsData = await api.getWorkshops();
      const feedbackData = await api.getFeedback();
      const notificationsData = await api.getNotifications();
      setWorkshops(workshopsData);
      setFeedback(feedbackData);
      setNotifications(notificationsData);
    };
    fetchData();
  }, []);

  return (
    <WorkshopContext.Provider value={{ workshops, setWorkshops, feedback, setFeedback, notifications, setNotifications }}>
      {children}
    </WorkshopContext.Provider>
  );
};