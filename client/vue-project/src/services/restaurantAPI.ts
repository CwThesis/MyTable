const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT
const restaurantAPIService = {
  newRestaurant: async (restaurant: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/onboarding/${userID}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            `CognitoIdentityServiceProvider.${
              import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID
            }.${userID}.idToken`,
          )}`,
        },
        body: JSON.stringify(restaurant),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error generating the new restaurant: ', err)
    }
  },

  getRestaurant: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/onboarding/${userID}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            `CognitoIdentityServiceProvider.${
              import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID
            }.${userID}.idToken`,
          )}`,
        },
      })
      const resParsed = await res.json()
      return JSON.parse(resParsed.body)
    } catch (err) {
      return console.log('Error getting the restaurant: ', err)
    }
  },

  updateRestaurant: async (updatedInfo: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/onboarding/${userID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            `CognitoIdentityServiceProvider.${
              import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID
            }.${userID}.idToken`,
          )}`,
        },
        body: JSON.stringify(updatedInfo),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error updating the restaurant: ', err)
    }
  },

  registerStripe: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/stripe`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            `CognitoIdentityServiceProvider.${
              import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID
            }.${userID}.idToken`,
          )}`,
        },
      })
      return await res.json()
    } catch (err) {
      return console.log("Couldn't save stripe registration: ", err)
    }
  },

  stripeDashboard: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/stripeDashboard`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            `CognitoIdentityServiceProvider.${
              import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID
            }.${userID}.idToken`,
          )}`,
        },
      })
      return await res.json()
    } catch (err) {
      return console.log("Couldn't get the stripe dashboard url:", err)
    }
  },
}

export default restaurantAPIService
