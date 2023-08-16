import React from 'react';
import {GoDotFill} from 'react-icons/go';

function Ticket({ ticket, users}) {
  const user = users.find((user) => user.id === ticket.userId);
  return (
    <div className="bg-gray-200 p-3 rounded-md mb-2">
      <div className="flex justify-between items-center my-2">
      <h3 className="text-sm mb-1 text-gray-500">{ticket.id}</h3>
        <div className="flex items-end justify-end">
          <img
            src={user && user.avatar}
            alt={user && user.name}
            className="w-6 h-6 rounded-full mr-2"
          />
        </div>
      </div>
      <p className="text-sm text-gray-800 font-semibold w-2/3">{ticket.title}</p>
      <p className="text-sm text-gray-500 my-3 p-1 rounded-md border border-gray-500/50 w-fit">
        <GoDotFill className="inline-block w-4 h-4 -mt-1" />
        {ticket.tag}
      </p>
    </div>
  );
}

export default Ticket;