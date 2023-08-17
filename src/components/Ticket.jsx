import React from 'react';
import {GoDotFill} from 'react-icons/go';

function Ticket({ ticket, users}) {
  const user = users.find((user) => user.id === ticket.userId);
  return (
    <div className="bg-white p-3 rounded-md mb-2">
      <div className="flex justify-between items-center">
      <h3 className="text-xs mb-1 text-gray-500">{ticket.id}</h3>
        <div className="flex items-end justify-end">
          <img
            src={user && user.avatar}
            alt={user && user.name}
            className="w-4 h-4 rounded-full mr-2"
          />
        </div>
      </div>
      <p className="text-xs text-gray-800 font-semibold w-3/4 line-clamp-2">
        {ticket.title}
      </p>
      <p className="text-[11px] text-gray-500 my-2 p-1 rounded-md border border-gray-500/50 w-fit">
        <GoDotFill className="inline-block w-3 h-3 -mt-1" />
        {ticket.tag}
      </p>
    </div>
  );
}

export default Ticket;