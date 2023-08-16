import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      );
      setTickets(response.data.tickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-3xl font-bold text-center">Kanban Board</h1>
      </header>
      <main className="p-4">
        <KanbanBoard tickets={tickets} />
      </main>
    </div>
  );
}

export default App;
