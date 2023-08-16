import React from 'react';

function Ticket({ ticket }) {
  return (
    <div className="bg-gray-200 p-3 rounded-md mb-2">
      <h3 className="text-lg font-semibold">{ticket.title}</h3>
      <p className="text-sm mb-1">Status: {ticket.status}</p>
      <p className="text-sm mb-1">Priority: {ticket.priority}</p>
      <p className="text-sm">Assigned to: {ticket.userId}</p>
    </div>
  );
}

export default Ticket;
