
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const tableAPIService = {

  newTable : async (table: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/newTable`, {
        method: "POST",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(table),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error generating the new restaurant: ", err);
    }
  },

  getAllTables : async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/getAllTables`, {
        method: "GET",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting the restaurant: ", err);
    }
  },

  updateTable : async (table: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/updateTable`, {
        method: "PUT",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(table),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error updating the restaurant: ", err);
    }
  },

  deleteTable : async (table: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/deleteTable`, {
        method: "DELETE",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(table),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error deleting the dish: ", err);
    }
  }

}

  export default tableAPIService;