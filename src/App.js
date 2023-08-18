import React, { useState, useEffect } from "react";
import axios from "axios";
import KanbanBoard from "./components/KanbanBoard";
import { VscSettings, VscChevronDown } from "react-icons/vsc";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setgroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      // changing the state of the tickets and users to the response data from the api
      setTickets(response.data.tickets);
      setUsers(response.data.users);
      console.log("Tickets Fetched Successfully: ", response.data.tickets);
      console.log("Users Fetched Successfully: ", response.data.users);
    } catch (error) {
      console.error("Error fetching tickets: ", error.message);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-nav">
          <div className="dropdown">
            <button className="head-btn" onClick={toggleList}>
              <VscSettings className="icon" />
              <span className="text">Display</span>
              <VscChevronDown className="icon" />
            </button>
            {isListOpen && (
              <ul className="dropdown-list">
                <li className="">
                  <ul>
                    {/* Grouping */}
                    <li className="dropdown-list-item">
                      <h3 className="dropdown-list-item-head ">Grouping</h3>
                      <select
                        className="dropdown-list-item-select"
                        value={groupBy}
                        onChange={(e) => setgroupBy(e.target.value)}
                      >
                        <option value="status">Status</option>
                        <option value="user">User</option>
                        <option value="priority">Priority</option>
                      </select>
                    </li>
                    {/* Sorting */}
                    <li className="dropdown-list-item">
                      <h3 className="dropdown-list-item-head">Sorting</h3>
                      <select
                        className="dropdown-list-item-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                      </select>
                    </li>
                  </ul>
                  {/* </div> */}
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
      <div style={{ padding: "1rem" }}>
        {/* Passing the above as the params of KanbanBoard function */}
        <KanbanBoard
          tickets={tickets}
          groupBy={groupBy}
          users={users}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
}

export default App;
