
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const tableAPIService = {

  newTable : async (tableName: string, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/newTable`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify({name: tableName}),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error generating the new table: ", err);
    }
  },

  getAllTables : async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/getAllTables`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting the table: ", err);
    }
  },

  updateTable : async (table: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/updateTable`, {
        method: "PUT",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify(table),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error updating the table: ", err);
    }
  },

  deleteTable : async (tableID: string, userID: string) => {
    try {
      console.log(tableID, userID)
      const res = await fetch(`${BE_URL}/dashboard/${userID}/${tableID}/deleteTable`, {
        method: "DELETE",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      });
      return await res.json();
    } catch (err) {
      return console.log("Error deleting the table: ", err);
    }
  },

  refreshPin : async (tableID: string, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/${tableID}/newPincode`, {
        method: "PUT",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      });
      return await res.json();
    } catch (err) {
      return console.log("Error refreshing the table pin: ", err);
    }
  }
}

  export default tableAPIService;