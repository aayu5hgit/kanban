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
            <BsClock className="inline-block w-5 h-5 mr-2 ml-1 text-blue-500" />
          ) : groupedTickets[groupKey].some((ticket) => ticket.status === 'In progress') ? (
            <PiCircleHalfFill className="inline-block w-5 h-5 mr-2 ml-1 text-orange-500" />
          ) : groupedTickets[groupKey].some((ticket) => ticket.status === 'Backlog') ? (
            <BiErrorCircle className="inline-block w-5 h-5 mr-2 ml-1 text-red-500" />
          ) : null}
        </div>
      );
    } else if (groupBy === 'priority') {
      return (
        <>
          <div>
            {groupedTickets[groupKey].some((ticket) => ticket.priority === 0) ? (
              <span className="text-sm text-gray-500 mx-2">
                <BiSignal1 className="inline-block w-5 h-5 mr-2" />
                No Priority
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 1) ? (
              <span className="text-sm text-gray-500 mx-2">
                <BiSignal2 className="inline-block w-5 h-5 mr-2" />
                Low
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 2) ? (
              <span className="text-sm text-gray-500 mx-2">
                <BiSignal3 className="inline-block w-5 h-5 mr-2" />
                Medium
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 3) ? (
              <span className="text-sm text-gray-500 mx-2">
                <BiSignal4 className="inline-block w-5 h-5 mr-2" />
                High
              </span>
            ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 4) ? (
              <span className="text-sm text-gray-500 mx-2">
                <BiSignal5 className="inline-block w-5 h-5 mr-2 " />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {Object.keys(groupedTickets).map((groupKey) => (
      <div key={groupKey} className="rounded-lg p-2 w-full">
          <h2 className="text-sm font-semibold mb-2 flex items-center justify-between">
            <div className="flex items-center">
              {getGroupingIcon(groupKey)}
              {groupBy === 'user' ? (
                <div className="text-sm mt-1 flex items-center">
                  <div className={`w-6 h-6 rounded-full mr-2 float-left bg-blue-500 text-white flex items-center justify-center`}>
                    {users.find((user) => user.id === groupKey)?.name[0]}
                  </div>
                  {users.find((user) => user.id === groupKey)?.name}
                  {users.find((user) => user.id === groupKey)?.available ? (
                    <span className="inline-block w-2 h-2 bg-green-500 ml-1 rounded-full" />
                  ) : (
                    <span className="inline-block w-2 h-2 bg-red-500 ml-1 rounded-full" />
                  )}
                </div>
              ) : (
                groupKey
              )}
              <span className="text-xs text-gray-400 ml-2">
                ({groupedTickets[groupKey].length})
              </span>
            </div>
            <div>
              <VscAdd className="inline-block w-3 h-3 ml-2 cursor-pointer text-gray-500 hover:text-gray-800" />
              <VscEllipsis className="inline-block w-3 h-3 ml-2 cursor-pointer text-gray-500 hover:text-gray-800" />
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
