import React, { useContext, useState } from "react";
import WorkshopList from "../components/WorkshopList";
import WorkshopDetails from "../components/WorkshopDetails";
import { WorkshopContext } from "../context/WorkshopContext";
import Sidebar from "../components/Sidebar"; // ✅ Import your Sidebar
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const WorkshopBrowse = () => {
  const { workshops } = useContext(WorkshopContext);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.date.includes(searchTerm)
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Sidebar /> {/* ✅ Add your Sidebar here */}
      <div className="p-4" style={{ marginLeft: "60px" }}>
        <h2 className="h4 mb-4">Browse Workshops</h2>
        <input
          type="text"
          placeholder="Search by title or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-4"
        />
        <div className="row">
          <div className="col-md-6">
            <WorkshopList
              workshops={filteredWorkshops}
              onSelect={setSelectedWorkshop}
              showUpdate={false} // ✅ Hides the Update button
            />
          </div>
          <div className="col-md-6">
            {selectedWorkshop && (
              <WorkshopDetails workshop={selectedWorkshop} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkshopBrowse;
