import React, { useState } from "react";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState("");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "John",
      reason: "Vacation",
      fromDate: "2025-06-20",
      toDate: "2025-06-22",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Alice",
      reason: "Medical Leave",
      fromDate: "2025-06-25",
      toDate: "2025-06-27",
      status: "Pending",
    },
     {
      id: 3,
      employee: "Saran",
      reason: "family problem",
      fromDate: "2025-06-29",
      toDate: "2025-06-30",
      status: "pending",
    },
   {
      id: 4,
      employee: "Jeeva",
      reason: "Headache",
      fromDate: "2025-07-10",
      toDate: "2025-07-12",
      status: "pending",
    },
    {
      id: 5,
      employee: "Manoj",
      reason: "for passport verification",
      fromDate: "2025-07-15",
      toDate: "2025-07-16",
      status: "pending",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      id: Date.now(),
      employee,
      reason,
      fromDate,
      toDate,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);

    setEmployee("");
    setReason("");
    setFromDate("");
    setToDate("");
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  const filteredLeaves = filterEmployee
    ? leaves.filter((leave) =>
        leave.employee
          .toLowerCase()
          .includes(filterEmployee.toLowerCase())
      )
    : leaves;

  return (
    <div className="container">
      <h1>HR Employee Leave Management Tool</h1>

      <div className="form-section">
        <h2>Apply Leave</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Employee Name"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />

          <button type="submit">Apply Leave</button>
        </form>
      </div>

      <div className="filter-section">
        <h2>Filter by Employee</h2>

        <input
          type="text"
          placeholder="Search Employee"
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value)}
        />
      </div>

      <div className="history-section">
        <h2>Leave History</h2>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Reason</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee}</td>
                <td>{leave.reason}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td>
                  <span className={`status ${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </td>

                <td>
                  <button
                    className="approve"
                    onClick={() => updateStatus(leave.id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() => updateStatus(leave.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;