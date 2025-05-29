
let workshops = [
  { id: 1, title: 'Intro to React', date: '2025-06-01', type: 'Live', feedback: [] },
  { id: 2, title: 'JavaScript Basics', date: '2025-06-05', type: 'Pre-recorded', feedback: [] },
];
let feedback = [];
let notifications = [];

export const getWorkshops = async () => workshops;
export const addWorkshop = async (workshop) => {
  workshops = [...workshops, workshop];
};
export const deleteWorkshop = async (id) => {
  workshops = workshops.filter(workshop => workshop.id !== id);
};
export const getFeedback = async () => feedback;
export const addFeedback = async (feedbackData) => {
  feedback = [...feedback, feedbackData];
};
export const getNotifications = async () => notifications;
export const addNotification = async (notification) => {
  notifications = [...notifications, notification];
};