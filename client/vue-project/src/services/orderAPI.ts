
import type { DishIdWithAmount } from "@/types";
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const orderAPIService = {

  newOrder : async (CO: DishIdWithAmount[], CT: number, restID: string, tableID: string) => {
    const order = {order:{CO, CT}};
    console.log(order)
    try {
      const res = await fetch(`${BE_URL}/menu/${restID}/${tableID}/newOrder`, {
        method: "POST",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(order),
      });
      return await res.json();
    } catch (err) {
      return console.log("Error generating the new order: ", err);
    }
  },

  getRestaurantData : async (restID: string, tableID: string) => {
    try {
      const res = await fetch(`${BE_URL}/menu/${restID}/${tableID}/getMenu`, {
        method: "GET",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting restaurant data: ", err);
    }
  }
}


  export default orderAPIService;