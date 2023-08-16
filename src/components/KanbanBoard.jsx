import React from 'react';
import Ticket from './Ticket';

function KanbanBoard({ tickets, groupingOption }) {
  const groupedTickets = {};
  tickets.forEach((ticket) => {
    const groupKey = groupingOption === 'user' ? ticket.userId : ticket[groupingOption];
    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">
            {groupingOption === 'user' ? `User: ${groupKey}` : groupKey}
            <span className="text-sm text-gray-500 ml-2">
              ({groupedTickets[groupKey].length})
            </span>
          </h2>
          {groupedTickets[groupKey].map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
