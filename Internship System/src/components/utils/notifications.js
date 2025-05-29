export const addCompanyNotification = (type, message) => {
  const prev = JSON.parse(localStorage.getItem("companyNotifications")) || [];
  const newNotification = {
    id: Date.now(),
    type,
    message,
    time: new Date().toLocaleString(),
  };
  localStorage.setItem(
    "companyNotifications",
    JSON.stringify([newNotification, ...prev])
  );
};
