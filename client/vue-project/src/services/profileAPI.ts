const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const profileAPIService = {

  getProfile : async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/profile`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting the user profile: ", err);
    }
  },

  updateProfile : async (profile: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/profile`, {
        method: "PUT",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify(profile),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error updating the profile: ", err);
    }
  }

}

  export default profileAPIService;