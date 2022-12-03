
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const staffAPIService = {

  newStaff : async (staffName: string, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/newStaff`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify({name: staffName}),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error adding new staff: ", err);
    }
  },

  getAllStaff : async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/getAllStaff`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting all staff: ", err);
    }
  },

  updateStaff : async (staff: object, userID: string, staffID: string) => {
    try {
      
      console.log("in api",staff)
      const res = await fetch(`${BE_URL}/dashboard/${userID}/${staffID}/updateStaff`, {
        method: "PUT",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify({staff: staff}),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error updating the table: ", err);
    }
  },

  deleteStaff : async (staffID:string, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/${staffID}/deleteStaff`, {
        method: "DELETE",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      });
      return await res.json();
    } catch (err) {
      return console.log("Error deleting the table: ", err);
    }
  },
}

  export default staffAPIService;