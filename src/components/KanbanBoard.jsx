import React from "react";
import Ticket from "./Ticket";
import {VscAdd, VscEllipsis, VscListOrdered} from "react-icons/vsc";
import {BiCircle, BiCircleHalf, BiErrorCircle} from "react-icons/bi";
import {BiSignal1, BiSignal2, BiSignal3, BiSignal4, BiSignal5} from "react-icons/bi";

function KanbanBoard({ tickets, groupingOption, users }) {
  const groupedTickets = {};
  tickets.forEach((ticket) => {
    const groupKey =
      groupingOption === "user" ? ticket.userId : ticket[groupingOption];
    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  const getGroupingIcon = (groupKey) => {
    if (groupingOption === "status") {
      return (
        <div>
          {groupedTickets[groupKey].some((ticket) => ticket.status === "Todo") ? (
            <BiCircle className="inline-block w-5 h-5 mr-2 ml-1 text-gray-500"/>
          ) : groupedTickets[groupKey].some((ticket) => ticket.status === "In progress") ? (
            <BiCircleHalf className="inline-block w-5 h-5 mr-2 ml-1 text-orange-500"/>
          ) : groupedTickets[groupKey].some((ticket) => ticket.status === "Backlog") ? (
            <BiErrorCircle className="inline-block w-5 h-5 mr-2 ml-1 text-red-500"/>
          ) : null}
        </div>
      );
    } else if (groupingOption === "priority") {
      return (
        <>
        <div>
          {groupedTickets[groupKey].some((ticket) => ticket.priority === 0) ? (
            <span className="text-sm text-gray-500 mx-2">
              <BiSignal1 className="inline-block w-5 h-5 mr-2"/>
              No Priority
              </span>
          ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 1) ? (
            <span className="text-sm text-gray-500 mx-2">
              <BiSignal2 className="inline-block w-5 h-5 mr-2"/>
              Low 
              </span>
          ) : groupedTickets[groupKey].some((ticket) => ticket.priority === 2) ? (
            <span className="text-sm text-gray-500 mx-2">
              <BiSignal3 className="inline-block w-5 h-5 mr-2"/>
              Medium 
              </span>
          ) :  groupedTickets[groupKey].some((ticket) => ticket.priority === 3) ? (
            <span className="text-sm text-gray-500 mx-2">
              <BiSignal4 className="inline-block w-5 h-5 mr-2"/>
              High 
              </span>
          ): groupedTickets[groupKey].some((ticket) => ticket.priority === 4) ? (
              <span className="text-sm text-gray-500 mx-2">
                <BiSignal5 className="inline-block w-5 h-5 mr-2 "/>
                Urgent
              </span>
          ): null}
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
              {groupingOption === "user" ? (
                <div className="text-sm mt-1">
                  <img
                    src={users.find((user) => user.id === groupKey)?.image}
                    alt=""
                    className="w-6 h-6 rounded-full mr-2 float-left"
                  />
                  {users.find((user) => user.id === groupKey)?.name}
                </div>
              ) : (
                groupKey
              )}
              <span className="text-sm text-gray-500 ml-2">
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
