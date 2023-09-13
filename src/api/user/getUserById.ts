import { toast } from 'react-toastify'
import axios from '../../utils/axios'

export const getUserByIdQuery = async (userId: number) => {
  try {
    return await axios.get(`/users/${userId}`)
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
