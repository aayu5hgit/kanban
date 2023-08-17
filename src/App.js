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

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");

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
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white p-2">
        <div className="flex justify-start space-x-2 space-y-2">
          <div className="relative inline-block">
            <div className="group inline-block relative">
              <button className="text-gray-700 border bg-white border-gray-500/50 shadow-sm font-semibold py-1 px-2 rounded inline-flex items-center ">
                <VscSettings className="mr-1" />
                <span className="text-sm">Display</span>
                <VscChevronDown className="ml-1" />
              </button>
              <ul className="absolute text-gray-700 hover-block">
                <li className="group">
                  {/* <div className="container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
                  <ul className="bg-gray-100 shadow-md rounded-md px-4 pt-6 pb-6 mb-4 absolute hidden text-gray-700 group-hover:block space-y-4">
                    {/* Grouping */}
                    <li className="flex items-center space-x-12">
                      <h3 className=" px-2 whitespace-no-wrap inline-block text-sm text-gray-500 font-semibold">
                        Grouping
                      </h3>
                      <select
                        className="text-sm text-gray-500 border rounded-md px-2 bg-white w-24 float-right"
                        value={groupBy}
                        onChange={(e) => setgroupBy(e.target.value)}
                      >
                        <option value="status">Status</option>
                        <option value="user">User</option>
                        <option value="priority">Priority</option>
                      </select>
                    </li>
                    {/* Sorting */}
                    <li className="flex items-center space-x-14">
                      <h3 className=" px-2 whitespace-no-wrap inline-block text-sm text-gray-500 font-semibold">
                        Sorting
                      </h3>
                      <select
                        className="text-sm text-gray-500 border rounded-md px-2 bg-white w-24 float-right"
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
            </div>
          </div>
        </div>
      </header>
      <div className="p-4">
        {/* Passing the above as the params of KanbanBoard function */}
        <KanbanBoard 
        tickets={tickets} 
        groupBy={groupBy} 
        users={users} 
        sortBy={sortBy} />
      </div>
    </div>
  );
}

export default App;
