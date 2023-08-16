import React from 'react';
import Ticket from './Ticket';

function KanbanBoard({ tickets }) {
  const todoTickets = tickets.filter(ticket => ticket.status === 'Todo');
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'In progress');
  const doneTickets = tickets.filter(ticket => ticket.status === 'Done');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">To Do</h2>
        {todoTickets.map(ticket => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">In Progress</h2>
        {inProgressTickets.map(ticket => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Done</h2>
        {doneTickets.map(ticket => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
