const BE_URL = import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT
const ticketAPIService = {
  newTicket: async (ticket: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/newTicket`, {
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
        body: JSON.stringify(ticket),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error generating the new ticket: ', err)
    }
  },

  getAllTickets: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/getAllTickets`, {
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
      return console.log('Error getting the tickets: ', err)
    }
  },

  getAllWaiters: async (userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/allStaff`, {
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
      return console.log('Error getting the waiters: ', err)
    }
  },

  updateTicket: async (ticket: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/updateTicket`, {
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
        body: JSON.stringify({ ticket: ticket }),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error updating the ticket: ', err)
    }
  },

  updateWaiter: async (waiter: any, userID: string, table: any) => {
    try {
      const res = await fetch(
        `${BE_URL}/dashboard/${userID}/${table.id}/addStaff`,
        {
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
          body: JSON.stringify({ staff: waiter }),
        },
      )
      return await res.json()
    } catch (err) {
      return console.log('Error updating the waiter: ', err)
    }
  },

  deleteTicket: async (ticket: any, userID: string) => {
    try {
      const res = await fetch(`${BE_URL}/dashboard/${userID}/deleteTicket`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            `CognitoIdentityServiceProvider.${
              import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID
            }.${userID}.idToken`,
          )}`,
        },
        body: JSON.stringify(ticket),
      })
      return await res.json()
    } catch (err) {
      return console.log('Error deleting the ticket: ', err)
    }
  },
}

export default ticketAPIService
