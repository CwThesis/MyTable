
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const ticketAPIService = {

  newTicket : async (ticket: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/customer/${tableID}/newTicket`, {
        method: "POST",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(ticket),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error generating the new ticket: ", err);
    }
  },

  getAllTickets : async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/customer/${tableID}/getAllTickets`, {
        method: "GET",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting the tickets: ", err);
    }
  },

  updateTicket : async (ticket: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/customer/${tableID}/updateTicket`, {
        method: "PUT",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(ticket),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error updating the ticket: ", err);
    }
  },

  deleteTicket : async (ticket: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/customer/${tableID}//deleteTicket`, {
        method: "DELETE",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(ticket),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error deleting the ticket: ", err);
    }
  }
}

  export default ticketAPIService;
