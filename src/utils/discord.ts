import axios from 'axios'

// Validate user ID
export const validateUserID = async (oAuthToken: string | undefined, dataUserId: string) => {
  // Check user token is exist
  if (!oAuthToken) throw new Error('Unauthorized')

  // Get user data
  const res = await axios({
    method: 'get',
    url: 'https://discord.com/api/users/@me',
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
      authorization: oAuthToken.startsWith('Bearer ') ? oAuthToken : `Bearer ${oAuthToken}`,
    },
  })

  // Check user ID is equal
  if (res.data.id !== dataUserId) throw new Error('User ID is different from payload')
}
