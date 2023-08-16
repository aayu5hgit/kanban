import React from 'react';
import {GoDotFill} from 'react-icons/go';

function Ticket({ ticket }) {
  return (
    <div className="bg-gray-200 p-3 rounded-md mb-2">
      <h3 className="text-sm mb-1 text-gray-500">{ticket.id}</h3>
      <p className="text-sm text-gray-800 font-semibold w-2/3">{ticket.title}</p>
      {/* Make a curved ring */}
      <p className="text-sm text-gray-500 my-3 p-1 rounded-md border border-gray-500/70 w-fit">
        <GoDotFill className="inline-block" />
        {ticket.tag}
      </p>
    </div>
  );
}

export default Ticket;
