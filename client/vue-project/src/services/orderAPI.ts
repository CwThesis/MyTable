
import type { DishIdWithAmount } from "@/types";
const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT;
const orderAPIService = {

  newOrder : async (CO: DishIdWithAmount[], CT: number, restID: string, tableID: string) => {
    const order = {order:{CO, CT}};
    console.log(order)
    try {
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/newOrder`, {
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
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/getMenu`, {
        method: "GET",
        mode: "cors",
        headers:{"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting restaurant data: ", err);
    }
  },

  getTicket : async (restID: string, tableID: string) => {
    try {
     
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/getTicket`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return JSON.parse(resParsed.body);
    } catch (err) {
      return console.log("Error getting the ticket: ", err);
    }
  },
  
  payTicket : async (order: any[], restID: string, tableID: string) => {
    
    try {
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/payOrder/fullBill`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order),
      });
      const resParsed =  await res.json();
      return resParsed;
    } catch (err) {
      return console.log("Error paying the ticket: ", err);
    }
  },
  
  paySplitEqual : async (orders: any[], split:number, restID: string, tableID: string) => {
    
    try {
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/payOrder/splitEqual`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({array: orders, split: split}),
      });
      const resParsed =  await res.json();
      return resParsed;
    } catch (err) {
      return console.log("Error paying the ticket: ", err);
    }
  },
  
  paySetAmount : async (amount: number, restID: string, tableID: string) => {
    
    try {
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/payOrder/setAmount`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(amount),
      });
      const resParsed =  await res.json();
      return resParsed;
    } catch (err) {
      return console.log("Error paying the ticket: ", err);
    }
  },

  getAccount : async (restID: string, tableID: string) => {
    try {
     
      const res = await fetch(`${BE_URL}/customer/${restID}/${tableID}/getAccount`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
      });
      const resParsed =  await res.json();
      return resParsed;
    } catch (err) {
      return console.log("Error getting the account: ", err);
    }
  },

}


  export default orderAPIService;