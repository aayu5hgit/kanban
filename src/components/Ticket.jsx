import React from "react";
import "./Ticket.css";
import { BsClock } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { PiCircleHalfFill } from "react-icons/pi";

function Ticket({ ticket, users, groupBy }) {
  const user = users.find((user) => user.id === ticket.userId);
  const name = user ? user.name.charAt(0) : "-";
  const userAvailable = user ? user.available : false;

  return (
    <div className="ticket-container">
      <div className="ticket-box">
        <h3 className="ticket-id">{ticket.id}</h3>
        {groupBy !== "user" && (
          <div className="ticket-head">
            <div className="ticket-name">{name}</div>
            <div
              className={` ${
                userAvailable ? "ticket-avail" : "ticket-not-avail"
              } `}
            ></div>
          </div>
        )}
      </div>
      {groupBy !== "status" && (
        <div className="ticket-title-symbols">
          <span className="ticket-status">
            {ticket.status === "Todo" && <BsClock className="status-icon-todo" />}
            {ticket.status === "In progress" && (
              <PiCircleHalfFill className="status-icon-in-progress" />
            )}
            {ticket.status === "Backlog" && (
              <BiErrorCircle className="status-icon-backlog" />
            )}
          </span>
          <p className="ticket-title">{ticket.title}</p>
        </div>
      )}
      {groupBy === "status" && <p className="ticket-title">{ticket.title}</p>}
      <p className="ticket-tag">
        <span className="ticket-tag-dot" />
        {ticket.tag}
      </p>
    </div>
  );
}

export default Ticket;
