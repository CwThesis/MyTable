const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT
const dishAPIService = {
  newDish: async (dish: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dishes/${userID}/addDish`, {
        method: 'POST',
        mode: 'cors',
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify(dish),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error generating the new dish: ', err)
    }
  },

  getAllDishes: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dishes/${userID}/getAllDishes`, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
      })

      return await res.json()
    } catch (err) {
      return console.log('Error getting the dishes: ', err)
    }
  },

  updateDish: async (dish: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dishes/${userID}/editDish/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify(dish),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error updating the dish: ', err)
    }
  },

  deleteDish: async (dish: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dishes/${userID}/deleteDish/`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {"Content-Type": "application/json", "Authorization": `${localStorage.getItem(`CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID}.${userID}.idToken`)}`}, 
        body: JSON.stringify(dish),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error deleting the dish: ', err)
    }
  },
}

export default dishAPIService
