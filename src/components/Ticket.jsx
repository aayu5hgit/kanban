import React from 'react';

function Ticket({ ticket, users, groupingOption }) {
  const user = users.find((user) => user.id === ticket.userId);
  const name = user ? user.name.charAt(0) : '-';

  return (
    <div className="bg-white p-3 rounded-md mb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-xs mb-1 text-gray-500">{ticket.id}</h3>
        {groupingOption !== 'user' && (
          <div className="flex items-end justify-end">
            <div className="w-4 h-4 rounded-full mr-2 flex items-center justify-center text-white bg-blue-500 text-xs font-semibold">
              {name}
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-800 font-semibold w-3/4 line-clamp-2">
        {ticket.title}
      </p>
      <p className="text-[11px] text-gray-400 my-2 p-1 rounded-md border border-gray-400/20 w-fit">
        <span className="inline-block w-2 h-2 bg-gray-400 ml-1 mr-1 rounded-full" />
        {ticket.tag}
      </p>
    </div>
  );
}

export default Ticket;