
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const menuAPIService = {


  getMenu : async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/getMenu`, {
        method: "GET",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting the menu: ", err);
    }
  },

  updateMenu : async (menu: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/updateMenu`, {
        method: "PUT",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(menu),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error updating the menu: ", err);
    }
  }
}

  export default menuAPIService;