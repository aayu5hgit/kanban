import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      );
      setTickets(response.data.tickets);
      console.log('Tickets Fetched Successfully: ', response.data.tickets);
    } catch (error) {
      console.error('Error fetching tickets: ', error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-3xl font-bold text-center">Kanban Board</h1>
        <div className="flex justify-center space-x-4 mt-4">
          <label className="font-semibold">Group by:</label>
          <select
            className="border rounded px-2 py-1"
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
          >
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </header>
      <main className="p-4">
        <KanbanBoard
          tickets={tickets}
          groupingOption={groupingOption}
        />
      </main>
    </div>
  );
}

export default App;
