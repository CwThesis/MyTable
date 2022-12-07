import type { Banner } from '@/types'

const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT
const menuAPIService = {
  getMenu: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/getMenu`, {
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
      return console.log('Error getting the menu: ', err)
    }
  },

  toggleDish: async (dishId: string, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dishes/${userID}/toggleMenuDish`, {
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
        body: JSON.stringify({ dishId }),
      })
      return await res.json() //this is undefined
    } catch (err) {
      return console.log('Error adding the dish to the menu: ', err)
    }
  },
  addBanner: async (banner: Banner, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/menu/${userID}/addBanner`, {
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
        body: JSON.stringify(banner),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error adding banner to the menu: ', err)
    }
  },
  getBanner: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/menu/${userID}/getBanner`, {
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
      return console.log('Error adding banner to the menu: ', err)
    }
  },

  updateBanner: async (banner: Banner, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/menu/${userID}/updateBanner`, {
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
        body: JSON.stringify(banner),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error updating the banner: ', err)
    }
  },
}

export default menuAPIService
