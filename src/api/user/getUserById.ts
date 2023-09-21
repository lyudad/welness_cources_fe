import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { IUser } from '../../layouts/AuthContext'

export const getUserByIdQuery = async (userId: number): Promise<{ data: IUser } | void> => {
  try {
    return await axios.get(`/users/${userId}`)
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
