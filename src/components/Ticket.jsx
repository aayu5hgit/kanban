import React from 'react';
import './Ticket.css'
function Ticket({ ticket, users, groupBy }) {
  const user = users.find((user) => user.id === ticket.userId);
  const name = user ? user.name.charAt(0) : '-';
  const userAvailable = user ? user.available : false;

  return (
    <div className="ticket-container">
      <div className="ticket-box">
        <h3 className="ticket-id">{ticket.id}</h3>
        {groupBy !== 'user' &&  (
          <div className="ticket-head">
            <div className="ticket-name">
              {name}
            </div>
            <div className={`ticket-avail ${userAvailable ? 'bg-green-500' : 'bg-red-500'} `} ></div>
          </div>
        )}
      </div>
      <p className="ticket-title">
        {ticket.title}
      </p>
      <p className="ticket-tag">
        <span className="ticket-tag-dot" />
        {ticket.tag}
      </p>
    </div>
  );
}

export default Ticket;