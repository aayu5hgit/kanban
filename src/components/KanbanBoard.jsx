import React from 'react';
import Ticket from './Ticket';
import './KanbanBoard.css'
import { VscAdd, VscEllipsis, VscListOrdered } from 'react-icons/vsc';
import { BiCircle, BiErrorCircle, BiSignal1, BiSignal2, BiSignal3, BiSignal4, BiSignal5 } from 'react-icons/bi';
import { BsClock } from 'react-icons/bs';
import { PiCircleHalfFill } from 'react-icons/pi';

function KanbanBoard({ tickets, groupBy, sortBy, users }) {
  const groupedTickets = {};  
  
  // Grouping the tickets based on the groupBy value
  tickets.forEach((ticket) => {
    const groupKey = groupBy === 'user' ? ticket.userId : ticket[groupBy];
    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  // Sorting the tickets in each group based on the sortBy value
  Object.keys(groupedTickets).forEach((key) => {
    console.log(`Sorting for group: ${key}, sortBy: ${sortBy}`);
    groupedTickets[key].sort((a, b) => {
      if (sortBy === 'priority') {
        console.log('Sorting by priority');
        return b.priority - a.priority;
      }
      if (sortBy === 'title') {
        console.log('Sorting by title');
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });  
  if (groupBy === 'status') {
    groupedTickets['Done'] = [];
    groupedTickets['Cancelled'] = [];
  }
  console.log('Grouping Successfull: ', groupedTickets);
  
  // Dynamic Icons for Grouping
  const getGroupingIcon = (groupKey) => {
    if (groupBy === 'status') {
      return (
        <div>
          {groupedTickets[groupKey].some((ticket) => ticket.status === 'Todo') ? (
            <BsClock className="symbol-todo" />
          ) : groupedTickets[groupKey].some((ticket) => ticket.status === 'In progress') ? (
            <PiCircleHalfFill className="symbol-in-progress" />
          ) : groupedTickets[groupKey].some((ticket) => ticket.status === 'Backlog') ? (
            <BiErrorCircle className="symbol-backlog" />
          ) : null}
        </div>
      );
    } else if (groupBy === 'priority') {
      return (
        <>
          <div>
            {groupedTickets[groupKey].some((ticket) => ticket.priority === 0) ? (
              <span className="priority-main">
                <BiSignal1 className="priority-symbol" />
                No Priority
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 1) ? (
              <span className="priority-main">
                <BiSignal2 className="priority-symbol" />
                Low
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 2) ? (
              <span className="priority-main">
                <BiSignal3 className="priority-symbol" />
                Medium
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 3) ? (
              <span className="priority-main">
                <BiSignal4 className="priority-symbol" />
                High
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 4) ? (
              <span className="priority-main">
                <BiSignal5 className="priority-symbol" />
                Urgent
              </span>
            ) : null}
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="kanban-container">
    {Object.keys(groupedTickets).map((groupKey) => (
      <div key={groupKey} className="key">
          <h2 className="kanban-head">
            <div style={{"display":"flex","alignItems":"center"}}>
              {getGroupingIcon(groupKey)}
              {groupBy === 'user' ? (
                <div className="kanban-head-name">
                  <div className={`kanban-head-name-symbol`}>
                    {users.find((user) => user.id === groupKey)?.name[0]}
                  </div>
                  {users.find((user) => user.id === groupKey)?.name}
                  {users.find((user) => user.id === groupKey)?.available ? (
                    <span className="kanban-user-avail-true" />
                  ) : (
                    <span className="kanban-user-avail-false" />
                  )}
                </div>
              ) : (
                groupKey
              )}
              <span className="ticket-len">
                ({groupedTickets[groupKey].length})
              </span>
            </div>
            <div>
              <VscAdd className="kanban-etc" />
              <VscEllipsis className="kanban-etc" />
            </div>
          </h2>
          {groupedTickets[groupKey].map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} users={users} />
        ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
