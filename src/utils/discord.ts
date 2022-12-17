import axios from 'axios'

// Validate user ID
export const validateUserID = async (userToken: string | undefined, dataUserID: string) => {
  // Check user token is exist
  if (!userToken) {
    throw new Error('Unauthorized')
  }

  try {
    // Get user data
    const res = await axios({
      method: 'get',
      url: 'https://discord.com/api/v10/users/@me',
      headers: {
        authorization: userToken.startsWith('Bearer ') ? userToken : `Bearer ${userToken}`,
      },
    })

    // Check user ID is equal
    if (res.data.id !== dataUserID) {
      throw new Error('UserID wrong')
    }
  } catch (error: any) {
    throw new Error('Invalid User Token')
  }
}
